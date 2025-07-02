'use client'
import AppBody from '@/components/app-layout/AppBody'
import React from 'react'
import { useSet } from '@/context/set.context'
import LearningPathGetStarted from '@/components/assessment/LearningPathGetStarted';
import ModuleGetStarted from '@/components/assessment/ModuleGetStarted';

export default function SetPage() {
    const { state: { set } } = useSet();
    return (
        <AppBody
            heading={set?.name || 'Set Details'}
            subHeading={set?.description || 'Explore your set details and statistics.'}
            headerRightContent={
                <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: set?.color }}
                >
                    <i className={`${set?.iconClass} fas text-xl`}></i>
                </div>
            }
        >
            <LearningPathGetStarted/>
            <ModuleGetStarted/>
        </AppBody>
    )
}
