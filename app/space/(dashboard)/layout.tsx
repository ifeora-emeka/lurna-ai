import AppLayout from '@/components/app-layout/AppLayout'
import { LayoutProvider } from '@/context/layout.context'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

export default function layout({ children }: Props) {
  return (
    <LayoutProvider>
      <AppLayout>
        {children}
      </AppLayout>
    </LayoutProvider>
  )
}