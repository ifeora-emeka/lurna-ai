"use client"

import { 
  ArrowLeft,
  Route,
  CreditCard,
  FileText,
  BarChart3,
  Settings
} from "lucide-react"
import { SidebarLink } from "../layout/sidebar-link"

interface SetDetailsNavContentProps {
  setId: string
  isCollapsed?: boolean
}

export function SetDetailsNavContent({ setId, isCollapsed = false }: SetDetailsNavContentProps) {
  const setNavItems = [
    { href: "/space", icon: ArrowLeft, label: "Back to Learning Sets" },
    { href: `/space/set/${setId}`, icon: BarChart3, label: "Overview" },
    { href: `/space/set/${setId}/learning-path`, icon: Route, label: "Learning Path" },
    { href: `/space/set/${setId}/flash-cards`, icon: CreditCard, label: "Flash Cards" },
    { href: `/space/set/${setId}/files`, icon: FileText, label: "Files" },
    { href: `/space/set/${setId}/settings`, icon: Settings, label: "Set Settings" },
  ]

  return (
    <div className="space-y-6">
      <div className={!isCollapsed ? "px-1" : ""}>
        <div className={`text-xs font-semibold text-sidebar-foreground/50 mb-3 tracking-wider uppercase ${isCollapsed ? "hidden" : ""}`}>
          Set Navigation
        </div>
        <nav className="space-y-2">
          {setNavItems.map((item) => (
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
  )
}
