'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, BookOpen, Loader2, RefreshCw, Sparkle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSet } from '@/context/set.context'
import { useParams } from 'next/navigation'
import { modulesApi } from '@/lib/api/modules'

type Props = {
}

interface EachActionProps {
    title: string
    description: string
    icon: React.ReactNode
    onAction: () => void
    isLoading?: boolean
    hasError?: boolean
    isCompleted?: boolean
}

export function EachAction({ title, description, icon, onAction, isLoading = false, hasError = false, isCompleted = false }: EachActionProps) {
    return (
        <div className='flex items-center p-4 hover:bg-accent/30 transition-all duration-200 rounded-lg'>
            <div className='flex gap-3 items-center flex-1'>
                <div className={cn(
                    'rounded-full h-12 w-12 flex items-center justify-center shadow-sm',
                    isCompleted ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
                )}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : icon}
                </div>
                <div className='flex flex-col'>
                    <p className='font-medium text-foreground'>{title}</p>
                    <small
                        className={cn('text-muted-foreground', {
                            "text-destructive bg-destructive/10 font-medium px-2 py-1 rounded": hasError,
                            "text-green-600": isCompleted
                        })}
                    >
                        {hasError ? `Error: ${description}` : isCompleted ? 'Completed!' : description}
                    </small>
                </div>
            </div>

            <Button
                onClick={onAction}
                disabled={isLoading || isCompleted}
                size='sm'
                className={cn(
                    "transition-all duration-200 gap-2",
                    hasError ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "",
                    isCompleted ? "bg-green-100 text-green-600 hover:bg-green-100" : ""
                )}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing</span>
                    </>
                ) : hasError ? (
                    <>
                        <RefreshCw className="h-4 w-4" />
                        <span>Retry</span>
                    </>
                ) : isCompleted ? (
                    <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Done</span>
                    </>
                ) : (
                    <span>Start</span>
                )}
            </Button>
        </div>
    )
}

export default function SetBootstrap({ }: Props) {
    const { state, setState } = useSet()
    const params = useParams()
    const setSlug = params.set_slug as string
    
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
    const [errorStates, setErrorStates] = useState<Record<string, boolean>>({})

    const handleGenerateModules = async () => {
        setLoadingStates(prev => ({ ...prev, modules: true }))
        setErrorStates(prev => ({ ...prev, modules: false }))

        try {
            const response = await modulesApi.generateModulesForSet(setSlug)
            setState({
                ...state,
                modules: response.data
            })
        } catch (error) {
            console.error('Failed to generate modules:', error)
            setErrorStates(prev => ({ ...prev, modules: true }))
        } finally {
            setLoadingStates(prev => ({ ...prev, modules: false }))
        }
    }

    const handleMaterialEvaluation = async () => {
        setLoadingStates(prev => ({ ...prev, materials: true }))
        setErrorStates(prev => ({ ...prev, materials: false }))

        setTimeout(() => {
            const shouldError = Math.random() < 0.3
            if (shouldError) {
                setErrorStates(prev => ({ ...prev, materials: true }))
            }
            setLoadingStates(prev => ({ ...prev, materials: false }))
        }, 2000)
    }

    const handleFinalizeSetup = async () => {
        setLoadingStates(prev => ({ ...prev, finalize: true }))
        setErrorStates(prev => ({ ...prev, finalize: false }))

        setTimeout(() => {
            const shouldError = Math.random() < 0.3
            if (shouldError) {
                setErrorStates(prev => ({ ...prev, finalize: true }))
            }
            setLoadingStates(prev => ({ ...prev, finalize: false }))
        }, 2000)
    }

    const hasModules = state.modules && state.modules.length > 0

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-secondary/5 min-h-screen">
            <div className="w-full max-w-4xl">
                <Card className="border shadow-lg overflow-hidden">
                    <CardHeader className="pb-2 text-center bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            Get Started with Your Learning Set
                        </CardTitle>
                        <CardDescription className="text-base">
                            Choose an action below to begin creating your learning experience
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4">
                        <div className="space-y-2">
                            <EachAction
                                title="Material Evaluation"
                                description="Analyze and evaluate your learning materials"
                                icon={<FileText className="w-5 h-5" />}
                                onAction={handleMaterialEvaluation}
                                isLoading={loadingStates.materials}
                                hasError={errorStates.materials}
                            />

                            <EachAction
                                title="Generate Modules"
                                description="Create structured learning modules for your set"
                                icon={<BookOpen className="w-5 h-5" />}
                                onAction={handleGenerateModules}
                                isLoading={loadingStates.modules}
                                hasError={errorStates.modules}
                                isCompleted={hasModules}
                            />

                            <EachAction
                                title="Finalize Setup"
                                description="Ensure all components are ready for use"
                                icon={<Sparkle className="w-5 h-5" />}
                                onAction={handleFinalizeSetup}
                                isLoading={loadingStates.finalize}
                                hasError={errorStates.finalize}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}