'use client';

import { useState, useRef, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    CloudUpload,
    Upload,
    BookText,
    Check,
    FileText,
    X,
    BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AppBody from '@/components/app-layout/AppBody';

type CreateMethod = 'init' | 'prompt' | 'documents' | 'loading' | 'success';

export default function CreateSetPage() {
    const [createMethod, setCreateMethod] = useState<CreateMethod>('init');
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 500) {
            setPrompt(value);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        setCreateMethod('loading');

        // Mock loading delay of 3 seconds
        setTimeout(() => {
            setCreateMethod('success');
        }, 3000);
    };

    const handleCreateWithPrompt = () => {
        if (prompt.trim().length === 0) return;
        handleSubmit();
    };

    const handleCreateWithDocuments = () => {
        if (files.length === 0) return;
        handleSubmit();
    };

    const resetForm = () => {
        setCreateMethod('init');
        setPrompt('');
        setFiles([]);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <AppBody
                heading='Create Learning Set'
                subHeading='Choose how you want to create your personalized learning content'
            >
                <div className="container md:max-w-5xl md:mx-auto py-8 md:px-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" />
                        
                        <Card className="relative border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                            
                            {createMethod === 'init' && (
                                <>
                                    <CardHeader className="text-center py-12 bg-gradient-to-b from-primary/5 to-transparent">
                                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                            <BookOpen className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                            How would you like to create your learning set?
                                        </CardTitle>
                                        <CardDescription className="text-lg mt-4 max-w-2xl mx-auto text-muted-foreground">
                                            Choose a method to create personalized learning content tailored to your needs
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-12 pb-12">
                                        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                                            <div
                                                onClick={() => setCreateMethod('prompt')}
                                                className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/20"
                                            >
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-6">
                                                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                                        <BookOpen className="h-10 w-10 text-white" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <h3 className="text-xl font-bold text-gray-900">Create with AI</h3>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            Describe what you want to learn and let our AI create a comprehensive learning set for you
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-sm text-primary font-medium">
                                                        <span>Get Started</span>
                                                        <div className="ml-2 w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                            <div className="w-1 h-1 bg-primary rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => setCreateMethod('documents')}
                                                className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/20"
                                            >
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-6">
                                                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                                        <CloudUpload className="h-10 w-10 text-white" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <h3 className="text-xl font-bold text-gray-900">Upload Documents</h3>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            Upload your own documents and we'll convert them into an interactive learning set
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-sm text-primary font-medium">
                                                        <span>Upload Files</span>
                                                        <div className="ml-2 w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                            <div className="w-1 h-1 bg-primary rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </>
                            )}

                        {createMethod === 'prompt' && (
                            <>
                                <CardHeader className="py-8 bg-gradient-to-b from-primary/5 to-transparent">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <BookOpen className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">Create with AI</CardTitle>
                                            <CardDescription className="text-base mt-1">
                                                Describe what you'd like to learn and our AI will create a custom learning set
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <Textarea
                                                value={prompt}
                                                onChange={handlePromptChange}
                                                placeholder="Example: I want to learn about quantum physics for beginners, focusing on core concepts and practical applications..."
                                                className="min-h-40 resize-none border-2 border-primary/20 focus:border-primary/40 rounded-xl p-4 text-base leading-relaxed bg-primary/5 focus:bg-white transition-colors duration-200"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
                                                    {prompt.length}/500
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                            <p className="text-sm text-blue-700 font-medium mb-2">💡 Pro Tip:</p>
                                            <p className="text-sm text-blue-600">
                                                Be specific about the topics, difficulty level, and learning objectives to get the best results.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between px-8 pb-8">
                                    <Button variant="outline" onClick={resetForm} className="px-8">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreateWithPrompt}
                                        disabled={prompt.trim().length === 0}
                                        className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Create Learning Set
                                    </Button>
                                </CardFooter>
                            </>
                        )}

                        {createMethod === 'documents' && (
                            <>
                                <CardHeader className="py-8 bg-gradient-to-b from-primary/5 to-transparent">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <CloudUpload className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">Upload Documents</CardTitle>
                                            <CardDescription className="text-base mt-1">
                                                Upload documents to create a learning set (PDF, DOCX, TXT)
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="space-y-8">
                                        <div
                                            className={cn(
                                                "relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 group",
                                                files.length > 0 
                                                    ? "border-primary/50 bg-primary/5" 
                                                    : "border-gray-300 hover:border-primary/50 hover:bg-primary/5"
                                            )}
                                            onClick={triggerFileInput}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                multiple
                                                accept=".pdf,.docx,.txt"
                                                className="hidden"
                                            />
                                            <div className="space-y-4">
                                                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <Upload className="h-10 w-10 text-primary" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        Drag files here or click to browse
                                                    </h3>
                                                    <p className="text-muted-foreground">
                                                        Support for PDF, DOCX, and TXT files (up to 50MB each)
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                                                    <span>Choose Files</span>
                                                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                                        <div className="w-1 h-1 bg-primary rounded-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {files.length > 0 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">Selected Files</h3>
                                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                                        {files.length} file{files.length !== 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                                                    {files.map((file, index) => (
                                                        <div key={`${file.name}-${index}`} className="group flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                                                            <div className="flex items-center gap-3 overflow-hidden">
                                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                    <FileText className="h-5 w-5 text-primary" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeFile(index);
                                                                }}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between px-8 pb-8">
                                    <Button variant="outline" onClick={resetForm} className="px-8">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreateWithDocuments}
                                        disabled={files.length === 0}
                                        className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Create Learning Set
                                    </Button>
                                </CardFooter>
                            </>
                        )}

                        {createMethod === 'loading' && (
                            <CardContent className="flex flex-col items-center justify-center py-24">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 relative">
                                        <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOpen className="h-8 w-8 text-primary animate-pulse" />
                                    </div>
                                </div>
                                <CardTitle className="text-2xl mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                    Creating your learning set
                                </CardTitle>
                                <CardDescription className="text-center max-w-md text-base">
                                    Our AI is analyzing your content and creating personalized learning materials. This may take a moment.
                                </CardDescription>
                                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                    <span>Processing</span>
                                </div>
                            </CardContent>
                        )}

                        {createMethod === 'success' && (
                            <CardContent className="flex flex-col items-center justify-center py-24">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                                        <Check className="h-12 w-12 text-white" />
                                    </div>
                                </div>
                                <CardTitle className="text-3xl mb-3 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                    Learning Set Created!
                                </CardTitle>
                                <CardDescription className="text-center max-w-md text-base mb-8">
                                    Your new learning set is ready to explore. Start your learning journey now!
                                </CardDescription>
                                <div className="flex gap-4">
                                    <Button 
                                        onClick={resetForm} 
                                        variant="outline" 
                                        className="border-2 hover:bg-primary/5"
                                    >
                                        Create Another
                                    </Button>
                                    <Button 
                                        // className="px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        View Learning Set
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </div>
        </AppBody>
    </>
);
}
