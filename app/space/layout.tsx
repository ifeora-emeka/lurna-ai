import React from 'react'
import { AppLayout } from '@/components/layout'
import { NavContentRenderer } from '@/components/nav-content'

export default function layout({children}: {children: React.ReactNode}) {
  return (
      <AppLayout navContent={<NavContentRenderer />}>
        {children}
      </AppLayout>
  )
}
