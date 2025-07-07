'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Clock, CheckCircle } from 'lucide-react'

interface AssessmentEndedProps {
  onViewResults: () => void
  isSubmitting?: boolean
}

export default function AssessmentEnded({ onViewResults, isSubmitting = false }: AssessmentEndedProps) {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="text-center">
        <CardHeader className="pb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Assessment Completed!
          </h2>
          <p className="text-muted-foreground">
            Your assessment has been submitted successfully. Time to see how you performed!
          </p>
        </CardHeader>
        
        <CardContent className="pb-8">
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Assessment automatically submitted when time expired</span>
          </div>
          
          <Button 
            onClick={onViewResults}
            disabled={isSubmitting}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? 'Processing Results...' : 'View Results'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
