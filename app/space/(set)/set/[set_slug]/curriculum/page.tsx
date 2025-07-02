'use client'
import AppBody from '@/components/app-layout/AppBody'
import React, { useState } from 'react'
import { useSet } from '@/context/set.context'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Plus, ArrowRight, List } from 'lucide-react'
import { unitsApi } from '@/lib/api/units'
import { Skeleton } from '@/components/ui/skeleton'
import { UnitAttributes } from '@/types/unit.types'

export default function CurriculumPage() {
    const { state, setState } = useSet()
    const [loadingModules, setLoadingModules] = useState<Set<number>>(new Set())
    const [errorModules, setErrorModules] = useState<Map<number, string>>(new Map())

    const handleGenerateUnits = async (moduleId: number) => {
        setLoadingModules(prev => new Set(prev).add(moduleId))
        setErrorModules(prev => {
            const newMap = new Map(prev)
            newMap.delete(moduleId)
            return newMap
        })
        
        try {
            const response = await unitsApi.generateUnitsForModule(moduleId)
            
            const updatedModules = state.modules.map(mod => {
                if (mod.id === moduleId) {
                    return {
                        ...mod,
                        units: response.data
                    }
                }
                return mod
            })
            
            const allUnits = updatedModules.flatMap(module => module.units || [])
            
            setState({
                ...state,
                modules: updatedModules,
                units: allUnits
            })
        } catch (error: any) {
            console.error('Failed to generate units:', error)
            let errorMessage = 'Failed to generate units'
            if (error.response?.data?.details) {
                errorMessage = error.response.data.details
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error
            } else if (error.message) {
                errorMessage = error.message
            }
            
            setErrorModules(prev => new Map(prev).set(moduleId, errorMessage))
        } finally {
            setLoadingModules(prev => {
                const newSet = new Set(prev)
                newSet.delete(moduleId)
                return newSet
            })
        }
    }

    const isAnyModuleLoading = loadingModules.size > 0

    if (!state.set || !state.modules || state.modules.length === 0) {
        return (
            <AppBody
                heading='Curriculum'
                subHeading='Explore the curriculum for this set'
            >
                <Card>
                    <CardContent className="py-12 text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Modules Available</h3>
                        <p className="text-muted-foreground">
                            This set doesn't have any modules yet. Generate modules first to see the curriculum.
                        </p>
                    </CardContent>
                </Card>
            </AppBody>
        )
    }

    return (
        <AppBody
            heading='Curriculum'
            subHeading={`${state.modules.length} modules • ${state.units.length} units`}
        >
            <div className="space-y-6">
                <Accordion type="multiple" className="space-y-4">
                    {state.modules.map((module, index) => {
                        const moduleUnits = module.units || []
                        const hasUnits = moduleUnits.length > 0
                        const isLoading = loadingModules.has(module.id!)
                        const hasError = errorModules.has(module.id!)

                        return (
                            <AccordionItem 
                                key={module.id} 
                                value={module.id!.toString()}
                                className="border rounded-lg bg-card shadow-sm overflow-hidden"
                            >
                                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-all data-[state=open]:bg-muted/20">
                                    <div className="flex items-start justify-between w-full text-left">
                                        <div className="flex gap-3">
                                            <div className="flex h-8 min-w-8 rounded-full bg-primary/10 items-center justify-center text-primary mt-0.5">
                                                <span className="text-sm font-medium">{index + 1}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-base">{module.name}</h3>
                                                <p className="text-muted-foreground text-sm">{module.description}</p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {module.tags.slice(0, 3).map((tag, i) => (
                                                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {module.tags.length > 4 && (
                                                        <Badge variant="outline" className="text-xs font-normal">
                                                            +{module.tags.length - 4}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center text-sm text-muted-foreground">
                                            <List className="h-4 w-4" />
                                            <span>{moduleUnits.length} units</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                
                                <AccordionContent className="px-6 pb-6">
                                    {isLoading ? (
                                        <div className="pt-4 space-y-4">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <Card key={i} className="p-4 border border-muted">
                                                    <div className="flex gap-3 items-start">
                                                        <Skeleton className="h-8 w-8 rounded-full" />
                                                        <div className="space-y-2 flex-1">
                                                            <Skeleton className="h-5 w-3/4" />
                                                            <Skeleton className="h-4 w-full" />
                                                            <div className="flex gap-1 pt-1">
                                                                <Skeleton className="h-4 w-16 rounded-full" />
                                                                <Skeleton className="h-4 w-16 rounded-full" />
                                                                <Skeleton className="h-4 w-16 rounded-full" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : hasUnits ? (
                                        <div className="pt-4 space-y-3">
                                            {moduleUnits.map((unit: UnitAttributes, unitIndex: number) => (
                                                <Card key={unit.id} className="p-4 border border-muted hover:border-primary/20 hover:bg-accent/5 transition-all duration-200 cursor-pointer group">
                                                    <div className="flex gap-3 items-start">
                                                        <div className="flex h-8 w-8 rounded-full bg-muted items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                            <span className="text-sm font-medium">{unitIndex + 1}</span>
                                                        </div>
                                                        <div className="space-y-1 flex-1">
                                                            <h4 className="font-medium text-foreground">{unit.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{unit.description}</p>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {unit.tags.slice(0, 2).map((tag, i) => (
                                                                    <Badge key={i} variant="outline" className="text-xs font-normal">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                                {unit.tags.length > 2 && (
                                                                    <span className="text-xs text-muted-foreground">
                                                                        +{unit.tags.length - 2} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                                <BookOpen className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <h4 className="font-medium mb-2">No Units Yet</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {hasError 
                                                    ? `Error: ${errorModules.get(module.id!) || 'Failed to generate units'}`
                                                    : "This module doesn't have any units. Generate units to start learning."
                                                }
                                            </p>
                                            <Button 
                                                onClick={() => handleGenerateUnits(module.id!)}
                                                disabled={isAnyModuleLoading}
                                                size="sm"
                                                className={`gap-2 ${hasError ? "bg-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground" : ""}`}
                                            >
                                                {hasError ? 
                                                    "Try Again" : 
                                                    <Plus className="h-4 w-4" />
                                                }
                                                {hasError ? "Try Again" : "Generate Units"}
                                            </Button>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
                <div className='h-40' />
            </div>
        </AppBody>
    )
}
