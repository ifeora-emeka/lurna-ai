"use client"

import { useParams } from "next/navigation"
import { SetDetailsNavContent } from "./set-details-nav-content"
import { DefaultNavContent } from "./default-nav-content"

interface NavContentRendererProps {
  isCollapsed?: boolean
}

export function NavContentRenderer({ isCollapsed = false }: NavContentRendererProps) {
  const params = useParams()
  const setId = params?.set_id as string | undefined

  if (setId) {
    return <SetDetailsNavContent setId={setId} isCollapsed={isCollapsed} />
  }

  return <DefaultNavContent isCollapsed={isCollapsed} />
}
