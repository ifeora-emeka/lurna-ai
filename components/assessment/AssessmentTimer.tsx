'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface AssessmentTimerProps {
  timeLimit?: number | null
  timeStarted?: Date | string | null
  onTimeUp?: () => void
}

export default function AssessmentTimer({ timeLimit, timeStarted, onTimeUp }: AssessmentTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!timeLimit || !timeStarted) return

    const startTime = new Date(timeStarted).getTime()
    const totalTime = timeLimit * 60 * 1000
    
    const updateTimer = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const remaining = Math.max(0, totalTime - elapsed)
      
      setTimeRemaining(remaining)
      
      if (remaining <= 0 && !isExpired) {
        setIsExpired(true)
        onTimeUp?.()
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [timeLimit, timeStarted, onTimeUp, isExpired])

  if (!timeLimit) {
    return;
  }

  if (timeRemaining === null) {
    return;
  }

  const minutes = Math.floor(timeRemaining / (60 * 1000))
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000)

  const isWarning = timeRemaining <= 5 * 60 * 1000
  const isCritical = timeRemaining <= 60 * 1000

  return (
    <div className={`flex items-center px-3 py-1 rounded-full ${
      isCritical 
        ? 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
        : isWarning
          ? 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30'
          : 'text-secondary bg-secondary/15'
    }`}>
      <div>
        <Clock className="w-4 h-4 mr-2" />
      </div>
      <span className="text-sm font-medium w-[2rem]">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
