'use client'
import AuthProvider from '@/components/providers/AuthProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import React from 'react'
import { Next13ProgressBar } from 'next13-progressbar';
import { Toaster } from "@/components/ui/sonner"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Next13ProgressBar height="4px" color="var(--secondary)" options={{ showSpinner: true }} showOnShallow />
            <AuthProvider>
                <QueryProvider>
                    <Toaster />
                    {children}
                </QueryProvider>
            </AuthProvider>
        </>
    )
}
