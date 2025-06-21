"use client"

import React, { useEffect } from 'react'
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout"
import {
    FileText,
    BarChart3,
    Clock,
    TrendingUp,
    Upload,
    Plus
} from "lucide-react"

export default function SpaceHomePage() {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    }, [user, isLoading, router])

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

    const stats = [
        {
            title: "Total Documents",
            value: "24",
            description: "PDFs uploaded this month",
            icon: FileText,
            trend: "+12%"
        },
        {
            title: "Quizzes Generated",
            value: "156",
            description: "Questions created from documents",
            icon: BarChart3,
            trend: "+23%"
        },
        {
            title: "Study Time",
            value: "48h",
            description: "Total time spent learning",
            icon: Clock,
            trend: "+8%"
        },
        {
            title: "Average Score",
            value: "87%",
            description: "Across all quiz attempts",
            icon: TrendingUp,
            trend: "+5%"
        }
    ]

    const recentDocuments = [
        { name: "Introduction to Machine Learning", date: "2 hours ago", questions: 24 },
        { name: "Data Structures and Algorithms", date: "1 day ago", questions: 31 },
        { name: "Web Development Fundamentals", date: "2 days ago", questions: 18 },
        { name: "Database Management Systems", date: "3 days ago", questions: 22 }
    ]

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
                        <p className="text-muted-foreground">
                            Here's what's happening with your learning today.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                            <Upload size={16} />
                            Upload PDF
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                            <Plus size={16} />
                            New Quiz
                        </button>
                    </div>
                </div>

                

            </div>
        </>
    )
}
