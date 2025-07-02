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
        >
            <LearningPathGetStarted/>
            <ModuleGetStarted/>
        </AppBody>
    )
}
