import AppLayout from '@/components/app-layout/AppLayout'
import SetNav from '@/components/app-layout/SetNav'
import { LayoutProvider } from '@/context/layout.context'
import { SetProvider } from '@/context/set.context'
import { setsApi } from '@/lib/api/sets'
import React from 'react'

type Props = {
    children?: React.ReactNode
    params: Promise<{ set_slug: string }>
}

export default async function SetDetailsLayout({ children, params }: Props) {
    const { set_slug } = await params;
    let initialSetData = null;
    
    try {
        const response = await setsApi.getSetBySlug(set_slug);
        initialSetData = response.data;
    } catch (error) {
        console.error('Failed to fetch set data:', error);
    }

    return (
        <SetProvider initialData={initialSetData}>
            <LayoutProvider>
                <AppLayout leftNavContent={<SetNav />} rightNavContent={<h1>How va</h1>}>
                    {children}
                </AppLayout>
            </LayoutProvider>
        </SetProvider>
    )
}