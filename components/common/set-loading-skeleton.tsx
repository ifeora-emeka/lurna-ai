export function SetLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-12">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border border-border rounded-2xl p-6 bg-card/50 backdrop-blur-sm animate-pulse overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-transparent to-muted/10" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-muted rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded-lg w-20"></div>
                  <div className="h-3 bg-muted rounded-lg w-16"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-muted rounded-xl"></div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="h-6 bg-muted rounded-lg w-4/5"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded-lg w-full"></div>
                <div className="h-4 bg-muted rounded-lg w-3/4"></div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-muted rounded-lg w-16"></div>
                <div className="h-4 bg-muted rounded-lg w-12"></div>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-3">
                <div className="bg-muted h-3 rounded-full w-3/5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-8"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-8"></div>
                </div>
              </div>
              <div className="h-4 bg-muted rounded-lg w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
