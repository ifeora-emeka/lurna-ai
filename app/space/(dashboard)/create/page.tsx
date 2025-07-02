'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
import SetWithPrompt from './SetWithPrompt';
import SetWithDocument from './SetWithDocument';
import { CreateSetResponse, SetAttributes } from '@/types/set.types';

type CreateMethod = 'init' | 'prompt' | 'documents' | 'loading' | 'success';

export default function CreateSetPage() {
    const router = useRouter();
    const [createMethod, setCreateMethod] = useState<CreateMethod>('init');
    const [createdSet, setCreatedSet] = useState<SetAttributes | null>(null);

    const handleCreateWithPrompt = (data: CreateSetResponse) => {
        setCreatedSet(data.data);
        setCreateMethod('success');
    };

    const resetForm = () => {
        setCreateMethod('init');
        setCreatedSet(null);
    };



    return (
        <>
            <AppBody
                heading='Create Learning Set'
                subHeading='Choose how you want to create your personalized learning content'
            >
                <div className="container md:max-w-5xl md:mx-auto pb-8 md:px-4">
                    <div className="relative">
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" /> */}

                        <div>
                            {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" /> */}

                            {createMethod === 'init' && (
                                <>
                                    <CardHeader className="text-center py-12 ">
                                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                            <BookOpen className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold">
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
                                                className="group relative overflow-hidden rounded-2xl border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 p-8 cursor-pointer transition-all duration-300 hover:border-secondary/40 hover:shadow-xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-secondary/10 hover:to-secondary/20"
                                            >
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    </div>
                                                </div>
                                                <div className="text-center space-y-6">
                                                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                                        <CloudUpload className="h-10 w-10 text-white" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <h3 className="text-xl font-bold text-gray-900">Upload Documents</h3>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            Upload your own documents and we'll convert them into an interactive learning set
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-sm text-secondary font-medium">
                                                        <span>Upload Files</span>
                                                        <div className="ml-2 w-4 h-4 rounded-full border-2 border-secondary flex items-center justify-center">
                                                            <div className="w-1 h-1 bg-secondary rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </>
                            )}

                            {createMethod === 'prompt' && (
                                <SetWithPrompt
                                    resetForm={resetForm}
                                    onSuccess={handleCreateWithPrompt}
                                />
                            )}

                            {createMethod === 'documents' && (
                                <SetWithDocument
                                    resetForm={resetForm}
                                    handleCreateWithDocuments={() => {}}
                                />
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
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                                            onClick={() => createdSet?.slug && router.push(`/space/set/${createdSet.slug}`)}
                                        >
                                            View Learning Set
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </div>
                    </div>
                </div>
            </AppBody>
        </>
    );
}
