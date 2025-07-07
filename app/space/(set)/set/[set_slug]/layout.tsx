import AppLayout from '@/components/app-layout/AppLayout'
import SetNav from '@/components/app-layout/SetNav'
import { LayoutProvider } from '@/context/layout.context'
import { SetProvider } from '@/context/set.context'
import { setsApi } from '@/lib/api/sets'
import NotFound from '@/components/NotFound'
import SectionPlaceholder from '@/components/placeholders/SectionPlaceholder'
import React from 'react'
import LearningPathOutline from '@/components/assessment/LearningPathOutline'

type Props = {
    children?: React.ReactNode
    params: Promise<{ set_slug: string }>
}

export default async function SetDetailsLayout({ children, params }: Props) {
    const { set_slug } = await params;
    let initialSetData = null;
    let isNotFound = false;
    let isServerError = false;

    try {
        const response = await setsApi.getSetBySlug(set_slug);
        initialSetData = response.data;
    } catch (error: any) {
        console.error('Failed to fetch set data:', error);
        if (error.response?.status === 404 || error.message?.includes('not found')) {
            isNotFound = true;
        } else if (error.response?.status >= 500) {
            isServerError = true;
        }
    }

    if (isNotFound) {
        return (
            <NotFound
                title="Learning Set Not Found"
                description="The learning set you're looking for doesn't exist or has been removed."
                backPath="/space"
            />
        );
    }

    if (isServerError) {
        return (
            <SectionPlaceholder
                type="error"
                header="Server Error"
                paragraph="We're experiencing technical difficulties. Please try again in a few moments."
                CTABtnText="Go Back to Dashboard"
                onCTAClick={() => window.location.href = '/space'}
            />
        );
    }

    return (
        <SetProvider initialData={initialSetData}>
            <LayoutProvider>
                <AppLayout
                    leftNavContent={<SetNav />}
                    rightNavContent={<LearningPathOutline />}
                >
                    {children}
                </AppLayout>
            </LayoutProvider>
        </SetProvider>
    )
}