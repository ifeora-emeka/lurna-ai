import React from 'react'
import Link from 'next/link'

export default function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-20 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="container max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Transform Your
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> PDFs </span>
                into Smart Quizzes
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Upload any document and let our AI create brilliant quiz questions, exam questions, and flashcards in seconds. Completely free, no credit card required.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Creating Quizzes
              </Link>
              <Link 
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-8 text-base font-medium text-foreground hover:bg-accent transition-colors"
              >
                See How It Works
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
            <div className="relative">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative p-8 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-700/50 rounded-3xl shadow-2xl hover:shadow-orange-200/50 transition-all duration-300">
                  <div className="relative">
                    <svg className="h-20 w-20 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="absolute inset-0 bg-orange-400/20 rounded-2xl blur-xl"></div>
                    <div className="absolute top-2 left-2 w-2 h-6 bg-orange-300 rounded-full opacity-70"></div>
                    <div className="absolute top-4 left-6 w-8 h-1 bg-orange-400 rounded-full opacity-60"></div>
                    <div className="absolute top-6 left-6 w-6 h-1 bg-orange-300 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 left-3 w-10 h-1 bg-orange-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-2 left-3 w-8 h-1 bg-orange-300 rounded-full opacity-50"></div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                    PDF
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-base font-semibold text-muted-foreground">Upload Document</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg className="h-10 w-10 text-indigo-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-indigo-400/30 rounded-full blur-lg animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="relative p-8 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-800/20 border-2 border-violet-200 dark:border-violet-700/50 rounded-3xl shadow-2xl hover:shadow-violet-200/50 transition-all duration-300">
                  <div className="relative">
                    <svg className="h-20 w-20 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="absolute inset-0 bg-violet-400/20 rounded-2xl blur-xl"></div>
                    <div className="absolute top-1 right-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute top-2 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-3 left-1 w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-1 left-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-3 left-1 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 animate-pulse">
                      <div className="absolute top-4 right-1 w-4 h-4 border-2 border-yellow-300 rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                    AI Magic
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-violet-300 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-3xl animate-pulse"></div>
                </div>
                <span className="text-base font-semibold text-muted-foreground">AI Processing</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg className="h-10 w-10 text-indigo-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-indigo-400/30 rounded-full blur-lg animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="relative p-8 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-800/20 border-2 border-emerald-200 dark:border-emerald-700/50 rounded-3xl shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300">
                  <div className="relative">
                    <svg className="h-20 w-20 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl"></div>
                    <div className="absolute top-2 left-3 w-6 h-1 bg-emerald-400 rounded-full opacity-70"></div>
                    <div className="absolute top-4 left-3 w-4 h-1 bg-emerald-300 rounded-full opacity-60"></div>
                    <div className="absolute top-6 left-5 w-2 h-1 bg-emerald-500 rounded-full opacity-80"></div>
                    <div className="absolute bottom-6 left-3 w-5 h-1 bg-emerald-400 rounded-full opacity-70"></div>
                    <div className="absolute bottom-4 left-3 w-3 h-1 bg-emerald-300 rounded-full opacity-60"></div>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                    Quiz
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-emerald-300 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-base font-semibold text-muted-foreground">Smart Questions</span>
              </div>
            </div>            
            <div className="mt-16 p-8 bg-gradient-to-br from-card via-card to-accent/30 border border-border rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Sample Output</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-600 font-semibold">95% Accuracy</span>
                  </div>
                  <div className="h-6 w-px bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-sm text-muted-foreground font-medium">AI Generated</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/50 rounded-2xl">
                  <p className="text-base text-foreground font-semibold mb-3">What is the primary function of mitochondria?</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">A) Protein synthesis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-emerald-700 font-semibold">B) Energy production ✓</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">C) DNA replication</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">D) Cell division</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700/50 rounded-2xl">
                  <p className="text-base text-foreground font-semibold mb-2">Explain the process of photosynthesis</p>
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">Open-ended</div>
                    <div className="px-2 py-1 bg-pink-100 dark:bg-pink-800/50 text-pink-700 dark:text-pink-300 text-xs rounded-full font-medium">Auto-generated</div>
                    <div className="px-2 py-1 bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 text-xs rounded-full font-medium">Biology</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
