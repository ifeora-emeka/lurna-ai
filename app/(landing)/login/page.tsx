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
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
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
        </div>
        
        <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-lg text-center">
            <div className="mb-8">
              <svg className="w-full h-80 mx-auto" viewBox="0 0 400 320" fill="none">
                <rect x="50" y="50" width="80" height="100" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2"/>
                <rect x="60" y="70" width="60" height="4" rx="2" fill="#d1d5db"/>
                <rect x="60" y="80" width="50" height="4" rx="2" fill="#d1d5db"/>
                <rect x="60" y="90" width="55" height="4" rx="2" fill="#d1d5db"/>
                <rect x="60" y="100" width="45" height="4" rx="2" fill="#d1d5db"/>
                <rect x="60" y="110" width="60" height="4" rx="2" fill="#d1d5db"/>
                <rect x="60" y="120" width="40" height="4" rx="2" fill="#d1d5db"/>
                <rect x="60" y="130" width="50" height="4" rx="2" fill="#d1d5db"/>
                
                <path d="M140 100 L180 100" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowblue)"/>
                
                <circle cx="200" cy="100" r="25" fill="#ffffff" stroke="#3b82f6" strokeWidth="3"/>
                <path d="M190 95 L195 100 L190 105 M205 95 L210 100 L205 105" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                <circle cx="200" cy="85" r="3" fill="#fbbf24"/>
                <circle cx="190" cy="115" r="2" fill="#10b981"/>
                <circle cx="210" cy="115" r="2" fill="#ef4444"/>
                
                <path d="M230 100 L270 100" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowblue)"/>
                
                <rect x="280" y="60" width="70" height="80" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2"/>
                <rect x="290" y="75" width="50" height="25" rx="4" fill="#f3f4f6" stroke="#d1d5db"/>
                <text x="315" y="90" textAnchor="middle" fontSize="8" fill="#374151">Q1</text>
                <rect x="290" y="105" width="50" height="25" rx="4" fill="#f3f4f6" stroke="#d1d5db"/>
                <text x="315" y="120" textAnchor="middle" fontSize="8" fill="#374151">Q2</text>
                
                <rect x="290" y="160" width="50" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                <text x="315" y="180" textAnchor="middle" fontSize="12" fill="#1e40af" fontWeight="bold">95</text>
                <text x="315" y="195" textAnchor="middle" fontSize="8" fill="#1e40af">Score</text>
                
                <circle cx="80" cy="40" r="8" fill="#3b82f6" opacity="0.3"/>
                <circle cx="350" cy="40" r="6" fill="#8b5cf6" opacity="0.3"/>
                <circle cx="350" cy="240" r="10" fill="#10b981" opacity="0.3"/>
                <circle cx="30" cy="240" r="7" fill="#f59e0b" opacity="0.3"/>
                
                <defs>
                  <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
                  </marker>
                </defs>
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Transform PDFs into Smart Quizzes
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Our AI analyzes your PDF documents and automatically generates comprehensive quiz questions, helping you learn faster and more effectively.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <p className="text-white text-sm">Upload PDF</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <p className="text-white text-sm">AI Analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <p className="text-white text-sm">Get Quiz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
