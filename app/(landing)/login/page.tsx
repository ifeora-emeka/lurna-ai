import React from 'react'

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
            <div className="min-h-screen grid lg:grid-cols-2">
                <div className="flex items-center justify-center p-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Welcome to Lurna AI
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Sign in to start converting PDFs to smart quiz questions
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                            <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl px-6 py-4 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-lg hover:shadow-xl">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    By signing in, you agree to our{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>                <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
                        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse delay-500"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-indigo-400/30 rounded-full animate-pulse delay-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3"></div>
                    </div>
                    
                    <div className="max-w-lg text-center relative z-10">
                        <div className="mb-12">                            <div className="flex items-center justify-center gap-8 mb-12">
                                <div className="relative group">
                                    <div className="w-24 h-32 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl shadow-2xl border border-slate-600/50 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                                        <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div className="space-y-1">
                                            <div className="w-12 h-1 bg-slate-500 rounded-full"></div>
                                            <div className="w-10 h-1 bg-slate-500 rounded-full"></div>
                                            <div className="w-11 h-1 bg-slate-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 font-semibold text-sm">PDF</div>
                                </div>
                                
                                <div className="relative flex items-center">
                                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="text-slate-400 font-semibold text-sm">AI Magic</div>
                                </div>
                                
                                <div className="relative flex items-center">
                                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <div className="w-24 h-32 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl shadow-2xl border border-slate-600/50 p-3">
                                            <div className="space-y-2">
                                                <div className="h-3 bg-slate-600 rounded-md text-xs flex items-center justify-center text-white font-medium">Q1</div>
                                                <div className="h-3 bg-slate-600 rounded-md text-xs flex items-center justify-center text-white font-medium">Q2</div>
                                                <div className="h-3 bg-slate-600 rounded-md text-xs flex items-center justify-center text-white font-medium">Q3</div>
                                                <div className="h-3 bg-slate-600 rounded-md text-xs flex items-center justify-center text-white font-medium">Q4</div>
                                                <div className="h-3 bg-slate-600 rounded-md text-xs flex items-center justify-center text-white font-medium">Q5</div>
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 font-semibold text-sm">Quiz</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-center mb-6">
                                <svg className="w-8 h-8 text-emerald-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                            
                            <div className="flex justify-center">
                                <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 shadow-2xl shadow-emerald-500/25 border border-emerald-400/30">
                                    <div className="text-white font-bold text-3xl mb-1">95/100</div>
                                    <div className="text-emerald-100 font-semibold">Success Rate</div>
                                    <div className="flex justify-center mt-3 gap-1">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-400"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Transform Documents into Success
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Watch your PDFs become intelligent quiz questions. Our AI extracts key concepts and creates personalized assessments that accelerate your learning journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
