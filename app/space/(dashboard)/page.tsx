import React from 'react'
import AppBody from '@/components/app-layout/AppBody'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, TrendingUp, Plus } from 'lucide-react'

export default function SpaceDetailsPage() {
    return (
        <AppBody
            heading='Your Space'
            subHeading='Manage your space, invite members, and customize settings.'
        >
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <Card className='bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800/30'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-blue-700 dark:text-blue-300'>Total Sets</CardTitle>
                        <div className='p-2 bg-blue-500 rounded-lg'>
                            <BookOpen className='h-4 w-4 text-white' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-blue-900 dark:text-blue-100'>12</div>
                        <p className='text-xs text-blue-600 dark:text-blue-400'>+2 from last month</p>
                    </CardContent>
                </Card>
                
                <Card className='bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800/30'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-green-700 dark:text-green-300'>Active Learners</CardTitle>
                        <div className='p-2 bg-green-500 rounded-lg'>
                            <Users className='h-4 w-4 text-white' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-green-900 dark:text-green-100'>248</div>
                        <p className='text-xs text-green-600 dark:text-green-400'>+12% from last week</p>
                    </CardContent>
                </Card>
                
                <Card className='bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800/30'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium text-purple-700 dark:text-purple-300'>Study Hours</CardTitle>
                        <div className='p-2 bg-purple-500 rounded-lg'>
                            <TrendingUp className='h-4 w-4 text-white' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-purple-900 dark:text-purple-100'>1,247</div>
                        <p className='text-xs text-purple-600 dark:text-purple-400'>+18% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <Card className='mt-6 bg-gradient-to-br from-background to-card border-border/50 shadow-lg'>
                <CardHeader className='bg-gradient-to-r from-card to-accent/10 border-b'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle className='text-lg'>Recent Learning Sets</CardTitle>
                            <CardDescription>Your most recently created or accessed sets</CardDescription>
                        </div>
                        <Button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all'>
                            <Plus className='h-4 w-4 mr-2' />
                            Create Set
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors'>
                            <div className='flex items-center gap-4'>
                                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                                    <BookOpen className='h-5 w-5 text-white' />
                                </div>
                                <div>
                                    <h4 className='font-medium'>Mathematics Basics</h4>
                                    <p className='text-sm text-muted-foreground'>24 cards • Created 2 days ago</p>
                                </div>
                            </div>
                            <Button variant='outline' size='sm'>Study</Button>
                        </div>
                        <div className='flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors'>
                            <div className='flex items-center gap-4'>
                                <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center'>
                                    <BookOpen className='h-5 w-5 text-white' />
                                </div>
                                <div>
                                    <h4 className='font-medium'>Spanish Vocabulary</h4>
                                    <p className='text-sm text-muted-foreground'>67 cards • Created 1 week ago</p>
                                </div>
                            </div>
                            <Button variant='outline' size='sm'>Study</Button>
                        </div>
                        <div className='flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors'>
                            <div className='flex items-center gap-4'>
                                <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center'>
                                    <BookOpen className='h-5 w-5 text-white' />
                                </div>
                                <div>
                                    <h4 className='font-medium'>History Timeline</h4>
                                    <p className='text-sm text-muted-foreground'>15 cards • Created 2 weeks ago</p>
                                </div>
                            </div>
                            <Button variant='outline' size='sm'>Study</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppBody>
    )
}
