"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  Home, 
  FileText, 
  Settings, 
  Users, 
  BarChart3, 
  Bookmark, 
  History,
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

const mainNavItems = [
  { href: "/space", icon: Home, label: "Dashboard" },
  { href: "/space/documents", icon: FileText, label: "Documents", badge: "12" },
  { href: "/space/quizzes", icon: BarChart3, label: "Quizzes" },
  { href: "/space/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: "/space/history", icon: History, label: "History" },
]

const bottomNavItems = [
  { href: "/space/settings", icon: Settings, label: "Settings" },
  { href: "/space/help", icon: HelpCircle, label: "Help & Support" },
]

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, isMobile } = useLayout()
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed)
    }
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
        "fixed left-0 top-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
        isMobile 
          ? "w-72 translate-x-0" 
          : isCollapsed 
            ? "w-16" 
            : "w-72",
        !isSidebarOpen && isMobile && "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Lurna AI"
                width={100}
                height={100}
                className="shrink-0"
              />
              {/* <span className="font-semibold text-sidebar-foreground">Lurna AI</span> */}
            </div>
          )}
          
          {!isMobile && (
            <button
              onClick={handleCollapse}
              className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors ml-auto"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {mainNavItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
          
          <div className="mt-8 px-3">
            <div className={cn(
              "text-xs font-medium text-sidebar-foreground/60 mb-2",
              isCollapsed && "hidden"
            )}>
              ACCOUNT
            </div>
            <nav className="space-y-1">
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

        <div className="border-t border-sidebar-border p-3">
          {user && (
            <div className={cn(
              "flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50 mb-3",
              isCollapsed && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <User size={16} className="text-sidebar-primary-foreground" />
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
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
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogOut size={20} className="shrink-0 group-hover:text-sidebar-primary transition-colors" />
            {!isCollapsed && <span>Sign Out</span>}
            
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
