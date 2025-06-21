import React from 'react'
import { APP_CONFIG } from '@/config/app.config'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-gradient-to-br from-primary/20 via-muted to-secondary/10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className='text-center'>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <center className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <svg
                  className="h-6 w-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </center>
              <span className="text-2xl font-bold text-foreground">{APP_CONFIG.name}</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Lurna AI</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to start converting PDFs to smart quiz questions
            </p>
          </div>          <div className="mt-8">
            <form action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/space" })
            }}>
              <button type="submit" className="w-full flex justify-center items-center px-6 py-4 border border-border rounded-lg shadow-lg bg-white text-base font-medium text-black transition-all duration-200 hover:shadow-xl">
                <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>      
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-card via-muted to-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center space-y-8">
            <h2 className="text-3xl font-bold">Transform Documents into Success</h2>
            <p className="text-lg text-white/80">
              Watch your PDFs become intelligent quiz questions. Our AI extracts key concepts and creates personalized assessments that accelerate your learning journey.
            </p>

            <div className="flex flex-col items-center space-y-12">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl">
                    <div className="relative">
                      <svg className="h-16 w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      PDF
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-300 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-medium text-white/80">Document</span>
                </div>

                <div className="flex flex-col items-center">
                  <svg className="h-8 w-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl">
                    <div className="relative">
                      <svg className="h-16 w-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div className="absolute inset-0 bg-purple-400/20 rounded-lg blur-xl"></div>
                      <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                      <div className="absolute top-3 right-3 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      AI Magic
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-300 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-medium text-white/80">AI Magic</span>
                </div>

                <div className="flex flex-col items-center">
                  <svg className="h-8 w-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl">
                    <div className="relative">
                      <svg className="h-16 w-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <div className="absolute inset-0 bg-emerald-400/20 rounded-lg blur-xl"></div>
                      <div className="absolute top-1 left-1 w-1 h-1 bg-green-300 rounded-full animate-ping"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-emerald-300 rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Quiz
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-300 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-medium text-white/80">Quiz</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <svg className="h-12 w-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <div className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-full max-w-sm shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Success Rate</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-400 font-medium">Live</span>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                      95
                    </div>
                    <div className="text-2xl font-bold text-white absolute -right-2 top-2">
                      /100
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-emerald-400">Success Rate</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <div className="text-sm text-white/80">Based on 10,000+ documents processed</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Quiz Questions Generated</span>
                    <span className="text-white font-semibold">847,329</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Average Processing Time</span>
                    <span className="text-emerald-400 font-semibold">12 seconds</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">User Satisfaction</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
