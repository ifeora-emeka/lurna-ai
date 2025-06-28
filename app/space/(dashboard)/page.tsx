import React from 'react'
import AppBody from '@/components/app-layout/AppBody'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, BookOpen, Users, Clock, Star } from 'lucide-react'

const learningSets = [
    {
        id: 1,
        title: 'CIT235',
        description: 'Database Management Systems',
        cardCount: 85,
        members: 12,
        lastStudied: '2 days ago',
        progress: 68,
        difficulty: 'Medium',
        color: 'bg-blue-500'
    },
    {
        id: 2,
        title: 'Intro to JavaScript',
        description: 'Fundamentals of JavaScript Programming',
        cardCount: 142,
        members: 28,
        lastStudied: '1 day ago',
        progress: 85,
        difficulty: 'Beginner',
        color: 'bg-yellow-500'
    },
    {
        id: 3,
        title: 'React Fundamentals',
        description: 'Learn React from the ground up',
        cardCount: 96,
        members: 21,
        lastStudied: '3 hours ago',
        progress: 42,
        difficulty: 'Intermediate',
        color: 'bg-cyan-500'
    },
    {
        id: 4,
        title: 'Data Structures',
        description: 'Essential data structures and algorithms',
        cardCount: 73,
        members: 15,
        lastStudied: '5 days ago',
        progress: 23,
        difficulty: 'Advanced',
        color: 'bg-purple-500'
    },
    {
        id: 5,
        title: 'Web Design Principles',
        description: 'Modern UI/UX design concepts',
        cardCount: 58,
        members: 34,
        lastStudied: '1 week ago',
        progress: 91,
        difficulty: 'Beginner',
        color: 'bg-pink-500'
    },
    {
        id: 6,
        title: 'Node.js Backend',
        description: 'Server-side JavaScript development',
        cardCount: 124,
        members: 19,
        lastStudied: '4 days ago',
        progress: 56,
        difficulty: 'Intermediate',
        color: 'bg-green-500'
    }
]

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
        case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
        case 'Advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
        default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
    }
}

export default function SpaceDetailsPage() {
    const createSetButton = (
        <Button>
            <Plus className='h-4 w-4' />
            Create Set
        </Button>
    )

    return (
        <AppBody
            heading='Your Sets'
            subHeading='Manage your sets, invite members, and customize settings.'
            headerRightContent={createSetButton}
        >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                {learningSets.map((set) => (
                    <Card key={set.id} >
                        <CardHeader className='pb-4'>
                            <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className={`w-12 h-12 rounded-xl ${set.color} flex items-center justify-center`}>
                                        <BookOpen className='h-6 w-6 text-white' />
                                    </div>
                                    <div>
                                        <CardTitle className='text-xl font-bold'>
                                            {set.title}
                                        </CardTitle>
                                        <CardDescription className='text-sm'>
                                            {set.description}
                                        </CardDescription>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(set.difficulty)}`}>
                                    {set.difficulty}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center justify-between text-sm text-muted-foreground'>
                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1'>
                                        <BookOpen className='h-4 w-4' />
                                        <span>{set.cardCount} cards</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Users className='h-4 w-4' />
                                        <span>{set.members} members</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Clock className='h-4 w-4' />
                                    <span>{set.lastStudied}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <div className='flex justify-center pt-8'>
                <Button variant='outline' size='lg' className='gap-2'>
                    <Plus className='h-4 w-4' />
                    Create Your First Set
                </Button>
            </div>
        </AppBody>
    )
}
