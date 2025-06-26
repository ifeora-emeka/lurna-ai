"use client"

import { useState } from "react"
import React from "react"
import Image from "next/image"
import { 
  Settings, 
  Users, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from "lucide-react"
import { SidebarLink } from "./sidebar-link"
import { useLayout } from "@/context/layout-context"
import { useAuth } from "@/context/auth-context"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
  { href: "/space/settings", icon: Settings, label: "Settings" },
  { href: "/space/help", icon: HelpCircle, label: "Help & Support" },
]

interface SidebarProps {
  navContent?: React.ReactNode
}

export function Sidebar({ navContent }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar, isMobile, isCollapsed, toggleCollapse } = useLayout()
  const { user } = useAuth()

  const handleCollapse = () => {
    toggleCollapse()
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  if (!isSidebarOpen && isMobile) {
    return null
  }

  return (
    <>
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border/60 backdrop-blur-sm transition-all duration-300 ease-in-out flex flex-col shadow-xl",
        isMobile 
          ? "w-72 translate-x-0" 
          : isCollapsed 
            ? "w-16" 
            : "w-72",
        !isSidebarOpen && isMobile && "-translate-x-full"
      )}>
        <div className={cn(
          "flex items-center p-4 border-b border-sidebar-border/60 bg-sidebar-accent/20",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-sidebar-foreground text-lg">Lurna AI</span>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
          )}
          
          {!isMobile && (
            <button
              onClick={handleCollapse}
              className={cn(
                "p-2 rounded-xl hover:bg-sidebar-accent/80 text-sidebar-foreground hover:text-sidebar-accent-foreground transition-all duration-200 shadow-sm hover:shadow-md",
                isCollapsed && "absolute -right-3 top-4 bg-background border border-sidebar-border/60 hover:bg-sidebar-accent z-10"
              )}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6">
          <div className={cn(
            "space-y-6",
            isCollapsed ? "px-2" : "px-4"
          )}>
            {navContent && React.isValidElement(navContent) 
              ? React.cloneElement(navContent as React.ReactElement<any>, { isCollapsed })
              : navContent
            }
          </div>
          
          <div className={cn(
            "mt-8 space-y-4",
            isCollapsed ? "px-2" : "px-4"
          )}>
            <div className={cn(
              "text-xs font-semibold text-sidebar-foreground/50 mb-3 tracking-wider uppercase",
              isCollapsed && "hidden"
            )}>
              Account
            </div>
            <nav className="space-y-2">
              {bottomNavItems.map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className={cn(
          "border-t border-sidebar-border/60 p-4 bg-sidebar-accent/10",
          isCollapsed && "px-2"
        )}>
          {user && (
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sidebar-accent/50 to-sidebar-accent/30 mb-4 backdrop-blur-sm border border-sidebar-border/30",
              isCollapsed && "justify-center p-2"
            )}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg ring-2 ring-background/50">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-xl"
                  />
                ) : (
                  <User size={18} className="text-white" />
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <button
            onClick={handleSignOut}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-sidebar-foreground hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 hover:text-red-600 group border border-transparent hover:border-red-200/30 relative",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogOut size={18} className="shrink-0 transition-colors" />
            {!isCollapsed && <span>Sign Out</span>}
            
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
