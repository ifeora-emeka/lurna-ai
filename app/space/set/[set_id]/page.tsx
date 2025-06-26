"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { FileText, BookOpen, Clock, TrendingUp, Play, MoreHorizontal, Star, Share, Calendar } from 'lucide-react'

export default function SetDetailsPage() {
  const params = useParams()
  const setId = params?.set_id as string

  const mockSetData = {
    "cit-435": {
      title: "Advanced Database Systems",
      subject: "CIT 435",
      description: "Comprehensive study of database design, optimization, and advanced SQL techniques for enterprise applications.",
      color: "#3B82F6",
      progress: 78,
      documentsCount: 12,
      questionsCount: 156,
      studyTime: "24h",
      lastAccessed: "2 hours ago"
    },
    "js-intro": {
      title: "Introduction to JavaScript",
      subject: "WEB 101", 
      description: "Learn the fundamentals of JavaScript programming including ES6 features, DOM manipulation, and async programming.",
      color: "#F59E0B",
      progress: 92,
      documentsCount: 8,
      questionsCount: 94,
      studyTime: "18h",
      lastAccessed: "1 day ago"
    }
  }

  const setData = mockSetData[setId as keyof typeof mockSetData] || mockSetData["cit-435"]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-3xl blur-3xl -z-10" style={{ backgroundColor: setData.color }} />
        <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex items-start gap-6 flex-1">
              <div 
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl ring-4 ring-white/20 shrink-0"
                style={{ backgroundColor: setData.color }}
              >
                {setData.subject.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    {setData.subject}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} />
                    {setData.lastAccessed}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {setData.title}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl">
                  {setData.description}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px] shrink-0">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
                <Play size={18} />
                Start Learning
              </button>
              <div className="flex gap-2">
                <button className="flex-1 lg:flex-none p-3 hover:bg-accent rounded-xl transition-all duration-200 border border-border/50">
                  <Share size={18} />
                </button>
                <button className="flex-1 lg:flex-none p-3 hover:bg-accent rounded-xl transition-all duration-200 border border-border/50">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{setData.documentsCount}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">Documents</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{setData.questionsCount}</div>
              <div className="text-sm text-green-700 dark:text-green-300 font-medium">Questions</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{setData.studyTime}</div>
              <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">Study Time</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{setData.progress}%</div>
              <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Learning Progress</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold">Overall Progress</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                  {setData.progress}% Complete
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                Keep going!
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-full bg-muted/50 rounded-full h-6 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-primary to-primary/80 h-6 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
                  style={{ width: `${setData.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Last studied {setData.lastAccessed}
                </span>
                <span className="text-primary font-semibold">
                  {100 - setData.progress}% remaining
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
            <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Study Time</span>
                <span className="font-bold">{setData.studyTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-bold text-primary">{setData.progress}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Activity</span>
                <span className="font-bold">{setData.lastAccessed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
