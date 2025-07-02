'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SearchX, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  title?: string
  description?: string
  showBackButton?: boolean
  backPath?: string
}

export default function NotFound({ 
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved.",
  showBackButton = true,
  backPath = '/space'
}: Props) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-secondary/5">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <SearchX className="h-12 w-12 text-primary/60" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full"></div>
            <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-full"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {title}
          </h1>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showBackButton && (
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            )}
            
            <Button asChild className="flex items-center gap-2">
              <Link href={backPath}>
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
