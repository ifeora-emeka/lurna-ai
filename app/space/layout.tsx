import React from 'react'
import { LayoutProvider } from "@/context/layout-context"
import { AppLayout } from '@/components/layout'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <LayoutProvider>
      <AppLayout>
        {children}
      </AppLayout>
    </LayoutProvider>
  )
}
