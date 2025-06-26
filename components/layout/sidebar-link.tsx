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
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
        isActive
          ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-lg border border-primary/20 backdrop-blur-sm"
          : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-sidebar-accent/80 hover:to-sidebar-accent/60 hover:text-sidebar-accent-foreground hover:shadow-md border border-transparent hover:border-sidebar-border/30",
        isCollapsed && "justify-center px-3 py-3"
      )}
    >
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
      )}
      
      <Icon 
        size={18} 
        className={cn(
          "shrink-0 transition-all duration-200 relative z-10",
          isActive 
            ? "text-primary drop-shadow-sm" 
            : "group-hover:text-sidebar-accent-foreground group-hover:scale-110"
        )} 
      />
      
      {!isCollapsed && (
        <>
          <span className="truncate relative z-10 font-medium">{label}</span>
          {badge && (
            <span className={cn(
              "ml-auto px-2.5 py-1 text-xs rounded-full font-semibold relative z-10 shadow-sm",
              isActive 
                ? "bg-primary text-white" 
                : "bg-sidebar-accent/80 text-sidebar-accent-foreground"
            )}>
              {badge}
            </span>
          )}
        </>
      )}

      {isCollapsed && (
        <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 backdrop-blur-sm">
          {label}
          {badge && <span className="ml-2 px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-md font-medium">({badge})</span>}
        </div>
      )}
    </Link>
  )
}
