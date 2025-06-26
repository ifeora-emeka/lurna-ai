"use client"

import { 
  Home, 
  FileText, 
  BarChart3, 
  Bookmark, 
  History 
} from "lucide-react"
import { SidebarLink } from "../layout/sidebar-link"
import { cn } from "@/lib/utils"

const defaultNavItems = [
  { href: "/space", icon: Home, label: "Learning Sets" },
  { href: "/space/documents", icon: FileText, label: "Documents", badge: "12" },
  { href: "/space/quizzes", icon: BarChart3, label: "Quizzes" },
  { href: "/space/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: "/space/history", icon: History, label: "History" },
]

interface DefaultNavContentProps {
  isCollapsed?: boolean
}

export function DefaultNavContent({ isCollapsed = false }: DefaultNavContentProps) {
  return (
    <div className="space-y-6">
      <div className={cn(
        "space-y-1",
        !isCollapsed && "px-1"
      )}>
        <div className={cn(
          "text-xs font-semibold text-sidebar-foreground/50 mb-3 tracking-wider uppercase",
          isCollapsed && "hidden"
        )}>
          Navigation
        </div>
        <nav className="space-y-2">
          {defaultNavItems.map((item) => (
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
      </div>
    </div>
  )
}
