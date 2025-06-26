"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface LayoutContextType {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  openSidebar: () => void
  isMobile: boolean
  isCollapsed: boolean
  toggleCollapse: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
        setIsCollapsed(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)
  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <LayoutContext.Provider 
      value={{ 
        isSidebarOpen, 
        toggleSidebar, 
        closeSidebar, 
        openSidebar, 
        isMobile,
        isCollapsed,
        toggleCollapse
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
