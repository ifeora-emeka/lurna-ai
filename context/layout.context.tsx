'use client'

import React, { createContext, useContext, useState } from 'react'

interface LayoutContextType {
  isNavOpen: boolean
  toggleNav: () => void
  closeNav: () => void
  openNav: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => setIsNavOpen(prev => !prev)
  const closeNav = () => setIsNavOpen(false)
  const openNav = () => setIsNavOpen(true)

  return (
    <LayoutContext.Provider value={{ isNavOpen, toggleNav, closeNav, openNav }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
