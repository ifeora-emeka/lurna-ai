"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLayout } from "@/context/layout-context"

interface SidebarLinkProps {
  href: string
  icon: LucideIcon
  label: string
  badge?: string | number
  isCollapsed?: boolean
}

export function SidebarLink({ 
  href, 
  icon: Icon, 
  label, 
  badge,
  isCollapsed = false 
}: SidebarLinkProps) {
  const pathname = usePathname()
  const { closeSidebar, isMobile } = useLayout()
  const isActive = pathname === href

  const handleClick = () => {
    if (isMobile) {
      closeSidebar()
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon 
        size={20} 
        className={cn(
          "shrink-0 transition-colors",
          isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary"
        )} 
      />
      
      {!isCollapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge && (
            <span className={cn(
              "ml-auto px-2 py-0.5 text-xs rounded-full font-medium",
              isActive 
                ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                : "bg-sidebar-accent text-sidebar-accent-foreground"
            )}>
              {badge}
            </span>
          )}
        </>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
          {label}
          {badge && <span className="ml-2 text-muted-foreground">({badge})</span>}
        </div>
      )}
    </Link>
  )
}
