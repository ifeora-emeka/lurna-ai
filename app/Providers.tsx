'use client'
import AuthProvider from '@/components/providers/AuthProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import React from 'react'
import { Next13ProgressBar } from 'next13-progressbar';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Next13ProgressBar height="4px" color="var(--secondary)" options={{ showSpinner: true }} showOnShallow />
            <AuthProvider>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </AuthProvider>
        </>
    )
}
