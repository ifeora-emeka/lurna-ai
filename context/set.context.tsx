'use client'

import React, { createContext, useContext, useState } from 'react'
import { SetAttributes } from '@/types/set.types'
import { ModuleAttributes } from '@/types/module.types'
import { UnitAttributes } from '@/types/unit.types'
import { LearningPathAttributes } from '@/types/learning-path.types'
import SetBootstrap from '@/app/space/(set)/set/[set_slug]/SetBootstrap'

interface SetState {
  set: SetAttributes | null
  modules: ModuleAttributes[]
  units: UnitAttributes[]
  learningPath: LearningPathAttributes | null
}

interface SetContextType {
  state: SetState
  setState: (state: SetState) => void
}

const SetContext = createContext<SetContextType | undefined>(undefined)

export function SetProvider({ children, initialData }: { children: React.ReactNode, initialData?: any }) {
  const allUnits = initialData?.modules?.flatMap((module: ModuleAttributes) => module.units || []) || [];
  
  const [state, setState] = useState<SetState>({
    set: initialData || null,
    modules: initialData?.modules || [],
    units: allUnits,
    learningPath: initialData?.learningPath || null
  })

  // console.log('SET STATE:::', state)

  return (
    <SetContext.Provider value={{ state, setState }}>
      {(!state.modules || state.modules.length === 0) ? <SetBootstrap/> : children}
    </SetContext.Provider>
  )
}

export function useSet() {
  const context = useContext(SetContext)
  if (context === undefined) {
    throw new Error('useSet must be used within a SetProvider')
  }
  return context
}