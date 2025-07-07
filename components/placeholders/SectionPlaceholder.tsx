'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Info, CheckCircle, X, RefreshCw } from 'lucide-react'
import { ReactNode } from 'react'

interface SectionPlaceholderProps {
  header: string
  paragraph: string
  onCTAClick?: () => void
  type?: 'error' | 'info' | 'success' | 'default'
  icon?: ReactNode
  CTABtnText?: string
  className?: string
}

const getTypeStyles = (type: 'error' | 'info' | 'success' | 'default') => {
  switch (type) {
    case 'error':
      return {
        containerClass: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800',
        iconClass: 'text-red-600 dark:text-red-400',
        headerClass: 'text-red-900 dark:text-red-100',
        paragraphClass: 'text-red-700 dark:text-red-300',
        buttonVariant: 'destructive' as const
      }
    case 'info':
      return {
        containerClass: 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800',
        iconClass: 'text-blue-600 dark:text-blue-400',
        headerClass: 'text-blue-900 dark:text-blue-100',
        paragraphClass: 'text-blue-700 dark:text-blue-300',
        buttonVariant: 'default' as const
      }
    case 'success':
      return {
        containerClass: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
        iconClass: 'text-green-600 dark:text-green-400',
        headerClass: 'text-green-900 dark:text-green-100',
        paragraphClass: 'text-green-700 dark:text-green-300',
        buttonVariant: 'default' as const
      }
    default:
      return {
        containerClass: 'bg-muted/50 border-border',
        iconClass: 'text-muted-foreground',
        headerClass: 'text-foreground',
        paragraphClass: 'text-muted-foreground',
        buttonVariant: 'default' as const
      }
  }
}

const getDefaultIcon = (type: 'error' | 'info' | 'success' | 'default') => {
  switch (type) {
    case 'error':
      return <AlertCircle className="w-8 h-8" />
    case 'info':
      return <Info className="w-8 h-8" />
    case 'success':
      return <CheckCircle className="w-8 h-8" />
    default:
      return <Info className="w-8 h-8" />
  }
}

export default function SectionPlaceholder({
  header,
  paragraph,
  onCTAClick,
  type = 'default',
  icon,
  CTABtnText,
  className = ''
}: SectionPlaceholderProps) {
  const styles = getTypeStyles(type)
  const displayIcon = icon || getDefaultIcon(type)

  return (
    <div className={`py-12 flex justify-center ${className}`}>
      <Card className={`w-full max-w-md border ${styles.containerClass}`}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${styles.iconClass}`}>
              {displayIcon}
            </div>
            <div className="space-y-2">
              <h3 className={`font-semibold text-lg ${styles.headerClass}`}>
                {header}
              </h3>
              <p className={`text-sm leading-relaxed ${styles.paragraphClass}`}>
                {paragraph}
              </p>
            </div>
            {onCTAClick && CTABtnText && (
              <Button
                onClick={onCTAClick}
                variant={styles.buttonVariant}
                className="mt-4"
              >
                {type === 'error' && <RefreshCw className="w-4 h-4 mr-2" />}
                {CTABtnText}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
