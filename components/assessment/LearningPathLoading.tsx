import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LearningPathLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div >
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48 rounded-md animate-pulse" />
            <Skeleton className="h-8 w-24 rounded-full animate-pulse bg-primary/20" />
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 pt-2 pb-4">
              <Skeleton className="h-3 w-3 rounded-full bg-primary/40 animate-pulse" />
              <Skeleton className="h-0.5 w-12 animate-pulse" />
              <Skeleton className="h-3 w-3 rounded-full animate-pulse" />
              <Skeleton className="h-0.5 w-12 animate-pulse" />
              <Skeleton className="h-3 w-3 rounded-full animate-pulse" />
              <Skeleton className="h-0.5 w-12 animate-pulse" />
              <Skeleton className="h-3 w-3 rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-5">
              <div className="space-y-3 pb-4">
                <Skeleton className="h-5 w-3/4 animate-pulse" />
                <Skeleton className="h-4 w-5/6 animate-pulse" />
                <Skeleton className="h-4 w-full animate-pulse" />
                <Skeleton className="h-4 w-2/3 animate-pulse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4 border border-border/50 rounded-lg p-4">
                  <Skeleton className="h-4 w-1/2 animate-pulse" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full animate-pulse" />
                    <Skeleton className="h-3 w-full animate-pulse" />
                    <Skeleton className="h-3 w-4/5 animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-4 border border-border/50 rounded-lg p-4">
                  <Skeleton className="h-4 w-1/2 animate-pulse" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full animate-pulse" />
                    <Skeleton className="h-3 w-full animate-pulse" />
                    <Skeleton className="h-3 w-4/5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Button area */}
            <div className="flex justify-center pt-4">
              <Skeleton className="h-10 w-36 rounded-md bg-primary/20 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
