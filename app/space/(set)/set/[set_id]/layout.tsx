import AppLayout from '@/components/app-layout/AppLayout'
import SetNav from '@/components/app-layout/SetNav'
import { LayoutProvider } from '@/context/layout.context'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

export default function layout({ children }: Props) {
    return (
        <LayoutProvider>
            <AppLayout leftNavContent={<SetNav />} rightNavContent={<h1>How va</h1>}>
                {children}
            </AppLayout>
        </LayoutProvider>
    )
}