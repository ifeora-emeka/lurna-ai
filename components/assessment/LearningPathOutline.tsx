'use client'
import { useSet } from '@/context/set.context'
import React, { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen, CheckCircle, Circle, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ModuleAttributes } from '@/types/module.types'
import { UnitAttributes } from '@/types/unit.types'

interface EachModuleProps {
    module: ModuleAttributes;
    isExpanded: boolean;
    isCurrent: boolean;
    isCompleted: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}

interface EachUnitProps {
    unit: UnitAttributes;
    isCurrent: boolean;
    isCompleted: boolean;
}

function EachModule({ module, isExpanded, isCurrent, isCompleted, onToggle, children }: EachModuleProps) {
    const moduleUnits = (module.units || []).sort((a, b) => a.index - b.index);

    return (
        <div className="space-y-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onToggle}
                        className="w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors hover:bg-muted/30"
                    >
                        <div className="flex items-center gap-1">
                            {moduleUnits.length > 0 ? (
                                isExpanded ? (
                                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                                ) : (
                                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                )
                            ) : (
                                <div className="w-3 h-3" />
                            )}
                            {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : isCurrent ? (
                                <Circle className="w-4 h-4 text-blue-600 fill-blue-100" />
                            ) : (
                                <Circle className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-sm font-medium truncate",
                                    isCompleted && "opacity-60"
                                )}>
                                    {module.name}
                                </span>
                            </div>
                        </div>
                    </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                    <div className="space-y-3 p-2">
                        <div>
                            <h4 className="font-semibold text-sm mb-1">{module.name}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{module.description}</p>
                        </div>
                        {module.tags && module.tags.length > 0 && (
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">Tags</p>
                                <div className="flex flex-wrap gap-1">
                                    {module.tags.map((tag, index) => (
                                        <div key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                                            <Tag className="w-2.5 h-2.5" />
                                            <span className="text-xs">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                            Module {module.index + 1} • {moduleUnits.length} unit{moduleUnits.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
            {children}
        </div>
    );
}

function EachUnit({ unit, isCurrent, isCompleted }: EachUnitProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-2 py-2 rounded-md transition-colors hover:bg-muted/30">
                    <div className="flex items-center gap-1 ml-1">
                        {isCompleted ? (
                            <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : isCurrent ? (
                            <Circle className="w-3 h-3 text-blue-600 fill-blue-100" />
                        ) : (
                            <Circle className="w-3 h-3 text-muted-foreground" />
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-sm truncate",
                                isCompleted && "opacity-60"
                            )}>
                                {unit.name}
                            </span>
                        </div>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
                <div className="space-y-3 p-2">
                    <div>
                        <h4 className="font-semibold text-sm mb-1">{unit.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{unit.description}</p>
                    </div>
                    {unit.tags && unit.tags.length > 0 && (
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Tags</p>
                            <div className="flex flex-wrap gap-1">
                                {unit.tags.map((tag, index) => (
                                    <div key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                                        <Tag className="w-2.5 h-2.5" />
                                        <span className="text-xs">{tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                        Unit {unit.index + 1}
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

export default function LearningPathOutline() {
    const { state: { set, modules, learningPath } } = useSet();
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

    const toggleModule = (moduleId: number) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    };

    const isCurrentModule = (moduleId: number) => {
        return learningPath?.currentModuleId === moduleId;
    };

    const isCurrentUnit = (unitId: number) => {
        return learningPath?.currentUnitId === unitId;
    };

    const isCompletedModule = (module: any) => {
        if (!learningPath?.currentModuleId) return false;
        const currentModule = modules.find(m => m.id === learningPath.currentModuleId);
        if (!currentModule) return false;
        return module.index < currentModule.index;
    };

    const isCompletedUnit = (unit: any, moduleId: number) => {
        if (!learningPath?.currentUnitId || !learningPath?.currentModuleId) return false;
        
        const currentModule = modules.find(m => m.id === learningPath.currentModuleId);
        const unitModule = modules.find(m => m.id === moduleId);
        
        if (!currentModule || !unitModule) return false;
        
        if (unitModule.index < currentModule.index) return true;
        
        if (unitModule.index === currentModule.index) {
            const currentUnit = unitModule.units?.find((u: any) => u.id === learningPath.currentUnitId);
            if (!currentUnit) return false;
            return unit.index < currentUnit.index;
        }
        
        return false;
    };

    if (!modules || modules.length === 0) {
        return (
            <div className="p-4">
                <div className="text-sm text-muted-foreground">No modules available</div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col select-none">
            <div className="h-16 border-b border-border px-4 flex flex-col justify-center">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Learning Path
                </h3>
                {set && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{set.name}</p>
                )}
            </div>
            
            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {modules
                        .sort((a, b) => a.index - b.index)
                        .map((module) => {
                        const isExpanded = expandedModules.has(module.id!);
                        const isCurrent = isCurrentModule(module.id!);
                        const isCompleted = isCompletedModule(module);
                        const moduleUnits = (module.units || []).sort((a, b) => a.index - b.index);

                        return (
                            <EachModule
                                key={module.id}
                                module={module}
                                isExpanded={isExpanded}
                                isCurrent={isCurrent}
                                isCompleted={isCompleted}
                                onToggle={() => toggleModule(module.id!)}
                            >
                                {isExpanded && moduleUnits.length > 0 && (
                                    <div className="ml-10">
                                        {moduleUnits.map((unit) => (
                                            <EachUnit
                                                key={unit.id}
                                                unit={unit}
                                                isCurrent={isCurrentUnit(unit.id!)}
                                                isCompleted={isCompletedUnit(unit, module.id!)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </EachModule>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
