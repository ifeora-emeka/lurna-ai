import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { BookOpen } from 'lucide-react'
import React, { useState } from 'react'
import { useSets } from '@/hooks/useSets'

type Props = {
    resetForm: () => void;
    onSuccess?: (data: any) => void;
}

export default function SetWithPrompt({ resetForm, onSuccess }: Props) {
    const [prompt, setPrompt] = useState('');
    const { createSetAsync, isCreating, createError } = useSets();
    
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 500) {
            setPrompt(value);
        }
    };

    const handleCreateWithPrompt = async () => {
        if (!prompt.trim()) return;
        
        try {
            const result = await createSetAsync({ prompt: prompt.trim() });
            onSuccess?.(result);
        } catch (error) {
            console.error('Failed to create set:', error);
        }
    };

    return (
        <>
            <>
                <CardHeader className="py-8 bg-gradient-to-b  to-transparent">
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
                        {createError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">
                                    Failed to create learning set. Please try again.
                                </p>
                            </div>
                        )}
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
                    <Button variant="outline" onClick={resetForm} className="px-8" disabled={isCreating}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateWithPrompt}
                        disabled={prompt.trim().length === 0 || isCreating}
                        className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        {isCreating ? 'Creating...' : 'Create Learning Set'}
                    </Button>
                </CardFooter>
            </>
        </>
    )
}