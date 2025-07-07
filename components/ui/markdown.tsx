import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { cn } from '@/lib/utils';
import type { Components } from 'react-markdown';

interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  const components: Components = {
    h1: ({ node, className: compClassName, ...props }) => (
      <h1 className={cn("text-2xl font-bold mt-6 mb-4", compClassName)} {...props} />
    ),
    h2: ({ node, className: compClassName, ...props }) => (
      <h2 className={cn("text-xl font-bold mt-5 mb-3", compClassName)} {...props} />
    ),
    h3: ({ node, className: compClassName, ...props }) => (
      <h3 className={cn("text-lg font-bold mt-4 mb-2", compClassName)} {...props} />
    ),
    p: ({ node, className: compClassName, ...props }) => (
      <p className={cn("mb-4", compClassName)} {...props} />
    ),
    a: ({ node, className: compClassName, ...props }) => (
      <a 
        className={cn("text-primary underline hover:text-primary/80 transition-colors", compClassName)} 
        target="_blank"
        rel="noopener noreferrer"
        {...props} 
      />
    ),
    ul: ({ node, className: compClassName, ...props }) => (
      <ul className={cn("list-disc ml-6 mb-4", compClassName)} {...props} />
    ),
    ol: ({ node, className: compClassName, ...props }) => (
      <ol className={cn("list-decimal ml-6 mb-4", compClassName)} {...props} />
    ),
    li: ({ node, className: compClassName, ...props }) => (
      <li className={cn("mb-1", compClassName)} {...props} />
    ),
    blockquote: ({ node, className: compClassName, ...props }) => (
      <blockquote className={cn("border-l-4 border-primary pl-4 italic my-4", compClassName)} {...props} />
    ),
    code: ({ node, className: compClassName, children, ...props }: any) => {
      const isInline = !props.className?.includes('language-');
      const match = /language-(\w+)/.exec(compClassName || '');
      
      return isInline ? (
        <code
          className={cn("bg-muted px-1.5 py-0.5 rounded font-mono text-sm", compClassName)}
          {...props}
        >
          {children}
        </code>
      ) : (
        <pre className="bg-muted p-0 rounded-lg overflow-x-auto mb-4 border border-border">
          <code
            className={cn(
              "block p-4 text-sm font-mono",
              match && `language-${match[1]}`,
              compClassName
            )}
            {...props}
          >
            {children}
          </code>
        </pre>
      );
    },
    pre: ({ node, ...props }) => <>{props.children}</>,
    table: ({ node, className: compClassName, ...props }) => (
      <div className="overflow-x-auto mb-4">
        <table className={cn("min-w-full border-collapse", compClassName)} {...props} />
      </div>
    ),
    th: ({ node, className: compClassName, ...props }) => (
      <th className={cn("border border-border px-4 py-2 bg-muted font-semibold", compClassName)} {...props} />
    ),
    td: ({ node, className: compClassName, ...props }) => (
      <td className={cn("border border-border px-4 py-2", compClassName)} {...props} />
    ),
    hr: ({ node, className: compClassName, ...props }) => (
      <hr className={cn("my-6 border-t border-border", compClassName)} {...props} />
    ),
    img: ({ node, className: compClassName, alt, ...props }) => (
      <img className={cn("max-w-full h-auto rounded", compClassName)} alt={alt || "Image"} {...props} />
    ),
  };

  return (
    <div className={cn("markdown-wrapper", className)}>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export { Markdown };
