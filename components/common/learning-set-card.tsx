"use client"

import Link from "next/link"
import { FileText, Users, Calendar, MoreHorizontal, BookOpen, Clock } from "lucide-react"

interface LearningSet {
  id: string
  title: string
  description: string
  subject: string
  color: string
  documentsCount: number
  questionsCount: number
  studyTime: string
  lastAccessed: string
  progress: number
}

interface LearningSetCardProps {
  set: LearningSet
}

export function LearningSetCard({ set }: LearningSetCardProps) {
  return (
    <Link 
      href={`/space/set/${set.id}`}
      className="block group transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative border border-border rounded-2xl p-6 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:border-primary/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white/20"
                style={{ backgroundColor: set.color }}
              >
                {set.subject.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-muted-foreground">{set.subject}</div>
                <div className="text-xs text-muted-foreground/70 mt-1">{set.lastAccessed}</div>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-accent rounded-xl">
              <MoreHorizontal size={16} />
            </button>
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {set.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {set.description}
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Progress</span>
              <span className="font-bold text-foreground">{set.progress}%</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${set.progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText size={16} className="text-blue-500" />
                <span className="text-sm font-medium">{set.documentsCount}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen size={16} className="text-green-500" />
                <span className="text-sm font-medium">{set.questionsCount}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} className="text-orange-500" />
                <span className="text-sm font-medium">{set.studyTime}</span>
              </div>
            </div>
            <div className="text-sm text-primary font-bold group-hover:underline flex items-center gap-1">
              Continue
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
