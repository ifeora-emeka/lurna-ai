"use client"

import { ReactNode } from "react"
import { Menu, Bell, Search } from "lucide-react"
import { Sidebar } from "./sidebar"
import { useLayout } from "@/context/layout-context"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: ReactNode
  title?: string
  showSearch?: boolean
  navContent?: ReactNode
}

export function AppLayout({ children, title, showSearch = true, navContent }: AppLayoutProps) {
  const { toggleSidebar, isSidebarOpen, isMobile, isCollapsed } = useLayout()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background-">
      <Sidebar navContent={navContent} />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isMobile 
          ? "ml-0" 
          : isSidebarOpen 
            ? isCollapsed ? "ml-16" : "ml-72"
            : "ml-16"
      )}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors md:hidden"
          >
            <Menu size={20} />
          </button>
          
          {title && (
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          )}
          
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {showSearch && (
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search documents, quizzes..."
                    className="flex h-9 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[200px] md:w-[300px] lg:w-[400px]"
                  />
                </div>
              </form>
            )}
            
            <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </button>
          </div>
        </header>
        
        <main className="flex-1 space-y-4 p-4 md:p-6 pt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
