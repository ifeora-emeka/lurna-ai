import AppBody from '@/components/app-layout/AppBody'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, BarChart3, Users, Calendar } from 'lucide-react'
import React from 'react'

export default function SetPage() {
    return (
        <AppBody
            heading='Mathematics Basics'
            subHeading='Master fundamental mathematical concepts with interactive practice.'
        >
            <div className='grid gap-6 md:grid-cols-3'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Total Cards</CardTitle>
                        <BarChart3 className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>24</div>
                        <p className='text-xs text-muted-foreground'>Ready to study</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Progress</CardTitle>
                        <BarChart3 className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>73%</div>
                        <p className='text-xs text-muted-foreground'>18 of 24 mastered</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Study Streak</CardTitle>
                        <Calendar className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>7</div>
                        <p className='text-xs text-muted-foreground'>Days in a row</p>
                    </CardContent>
                </Card>
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Start studying or review your progress</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <Button className='w-full justify-start' size='lg'>
                            <Play className='h-4 w-4 mr-2' />
                            Start Practice Session
                        </Button>
                        <Button variant='outline' className='w-full justify-start' size='lg'>
                            <BarChart3 className='h-4 w-4 mr-2' />
                            Review Progress
                        </Button>
                        <Button variant='outline' className='w-full justify-start' size='lg'>
                            <Users className='h-4 w-4 mr-2' />
                            Study with Others
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Your latest study sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='font-medium'>Practice Session</p>
                                    <p className='text-sm text-muted-foreground'>2 hours ago</p>
                                </div>
                                <Badge variant='secondary'>+85 points</Badge>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='font-medium'>Review Session</p>
                                    <p className='text-sm text-muted-foreground'>1 day ago</p>
                                </div>
                                <Badge variant='secondary'>+67 points</Badge>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='font-medium'>Practice Session</p>
                                    <p className='text-sm text-muted-foreground'>2 days ago</p>
                                </div>
                                <Badge variant='secondary'>+92 points</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cards to Review</CardTitle>
                    <CardDescription>Cards that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 border rounded-lg'>
                            <div>
                                <h4 className='font-medium'>What is 2 + 2?</h4>
                                <p className='text-sm text-muted-foreground'>Basic Addition</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Badge variant='outline'>Easy</Badge>
                                <Button variant='outline' size='sm'>Review</Button>
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-4 border rounded-lg'>
                            <div>
                                <h4 className='font-medium'>Solve: 3x + 5 = 14</h4>
                                <p className='text-sm text-muted-foreground'>Linear Equations</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Badge variant='destructive'>Hard</Badge>
                                <Button variant='outline' size='sm'>Review</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppBody>
    )
}
