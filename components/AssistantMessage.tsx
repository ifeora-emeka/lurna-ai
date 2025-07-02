import React from 'react'
import AssistantAvatar from './AssistantAvatar';
import { Markdown } from './ui/markdown';
import { cn } from '@/lib/utils';

type Props = {
    markdownText: string;
    flow?: 'horizontal' | 'vertical';
    children?: React.ReactNode;
}

export default function AssistantMessage({ markdownText, flow = 'horizontal', children }: Props) {
    const isHorizontal = flow === 'horizontal';
    
    return (
        <div className={cn(
            'flex gap-4',
            isHorizontal ? 'flex-row' : 'flex-col items-center'
        )}>
            <div className={cn(
                "flex-shrink-0",
                !isHorizontal && "mb-2"
            )}>
                <AssistantAvatar />
            </div>
            <div className={cn(
                'flex flex-col flex-grow font-poppins',
                isHorizontal ? 'max-w-full' : 'text-center w-full'
            )}>
                <strong className={cn(
                    'flex items-center gap-1 mb-1',
                    !isHorizontal && 'justify-center'
                )}>
                    Lurna AI ✨
                </strong>
                <Markdown content={markdownText} className="text-foreground" />
                {children}
            </div>
        </div>
    )
}