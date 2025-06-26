"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, SortAsc } from "lucide-react"
import { LearningSetCard } from "@/components/common/learning-set-card"
import { SetLoadingSkeleton } from "@/components/common/set-loading-skeleton"

export default function SpaceHomePage() {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const [setsLoading, setSetsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    }, [user, isLoading, router])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSetsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    const mockLearningSets = [
        {
            id: "cit-435",
            title: "Advanced Database Systems",
            description: "Comprehensive study of database design, optimization, and advanced SQL techniques for enterprise applications.",
            subject: "CIT 435",
            color: "#3B82F6",
            documentsCount: 12,
            questionsCount: 156,
            studyTime: "24h",
            lastAccessed: "2 hours ago",
            progress: 78
        },
        {
            id: "js-intro",
            title: "Introduction to JavaScript",
            description: "Learn the fundamentals of JavaScript programming including ES6 features, DOM manipulation, and async programming.",
            subject: "WEB 101",
            color: "#F59E0B",
            documentsCount: 8,
            questionsCount: 94,
            studyTime: "18h",
            lastAccessed: "1 day ago",
            progress: 92
        },
        {
            id: "react-advanced",
            title: "Advanced React Patterns",
            description: "Deep dive into React hooks, context, performance optimization, and modern React development patterns.",
            subject: "WEB 301",
            color: "#10B981",
            documentsCount: 15,
            questionsCount: 203,
            studyTime: "32h",
            lastAccessed: "3 hours ago",
            progress: 45
        },
        {
            id: "ai-ml",
            title: "Machine Learning Fundamentals",
            description: "Introduction to machine learning algorithms, data preprocessing, and model evaluation techniques.",
            subject: "CS 480",
            color: "#8B5CF6",
            documentsCount: 20,
            questionsCount: 278,
            studyTime: "41h",
            lastAccessed: "5 hours ago",
            progress: 63
        },
        {
            id: "cybersec",
            title: "Cybersecurity Essentials",
            description: "Core concepts of information security, threat analysis, and security implementation strategies.",
            subject: "CIT 380",
            color: "#EF4444",
            documentsCount: 18,
            questionsCount: 189,
            studyTime: "28h",
            lastAccessed: "1 day ago",
            progress: 34
        },
        {
            id: "data-struct",
            title: "Data Structures & Algorithms",
            description: "Comprehensive coverage of fundamental data structures and algorithmic problem-solving techniques.",
            subject: "CS 260",
            color: "#06B6D4",
            documentsCount: 14,
            questionsCount: 167,
            studyTime: "35h",
            lastAccessed: "2 days ago",
            progress: 87
        }
    ]

    const filteredSets = mockLearningSets.filter(set =>
        set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl blur-3xl -z-10" />
                <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 shadow-lg">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="flex-1">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Learning Sets
                            </h1>
                            <p className="text-muted-foreground mt-4 text-lg lg:text-xl max-w-3xl leading-relaxed">
                                Continue your learning journey with your personalized study sets. Track progress, manage documents, and master your subjects.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg">
                                <Plus size={20} />
                                Create Set
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1 max-w-2xl">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="Search learning sets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 border border-input rounded-xl bg-background/50 backdrop-blur-sm text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-background transition-all duration-200 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="inline-flex items-center gap-2 px-6 py-4 border border-input rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 bg-background/50 backdrop-blur-sm shadow-sm font-medium">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="inline-flex items-center gap-2 px-6 py-4 border border-input rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 bg-background/50 backdrop-blur-sm shadow-sm font-medium">
                        <SortAsc size={16} />
                        Sort
                    </button>
                </div>
            </div>

            {setsLoading ? (
                <SetLoadingSkeleton />
            ) : (
                <>
                    {filteredSets.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-muted/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <Search size={32} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {searchQuery ? "No sets found" : "No learning sets yet"}
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                {searchQuery 
                                    ? "Try adjusting your search terms or create a new set." 
                                    : "Create your first learning set to start organizing your study materials."
                                }
                            </p>
                            {!searchQuery && (
                                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-medium">
                                    <Plus size={18} />
                                    Create your first set
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-12">
                            {filteredSets.map((set) => (
                                <LearningSetCard key={set.id} set={set} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
