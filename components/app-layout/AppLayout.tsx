'use client'
import React from 'react'
import DefaultNav from './DefaultNav'
import { useLayout } from '@/context/layout.context'
import { X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

type Props = {
    children?: React.ReactNode;
    leftNavContent?: React.ReactNode;
    rightNavContent?: React.ReactNode;
}

export default function AppLayout({ children, leftNavContent, rightNavContent }: Props) {
    const { isNavOpen, closeNav } = useLayout()

    return (
        <div className='min-h-screen'>
            <div className='flex justify-center'>
                <div className='w-full 2xl:w-[1400px] flex relative'>
                    <aside className={`
                        fixed md:sticky top-0 z-40 h-screen bg-background border-r transition-transform duration-300 ease-in-out
                        w-[280px] md:w-[280px]
                        ${isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}>
                        <div className='border-b z-50 h-16 sticky top-0 flex justify-between items-center px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                            <div className='flex items-center gap-2'>
                                <Image 
                                    src="/logo.svg" 
                                    alt="Lurna AI" 
                                    width={120} 
                                    height={32}
                                    className='h-8 w-auto'
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-between p-4 md:hidden border-b'>
                            <h2 className='font-semibold'>Navigation</h2>
                            <Button size="icon" variant="ghost" onClick={closeNav}>
                                <X className='h-4 w-4' />
                            </Button>
                        </div>
                        <div className='p-4 pt-6 md:pt-6'>
                            {leftNavContent ? leftNavContent : <DefaultNav />}
                        </div>
                    </aside>

                    {isNavOpen && (
                        <div 
                            className='fixed inset-0 bg-black/50 z-30 md:hidden' 
                            onClick={closeNav}
                        />
                    )}

                    <div className='flex-1 md:ml-0'>
                        {children}
                    </div>

                    {rightNavContent && (
                        <aside className='hidden lg:block w-[320px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l h-screen sticky top-0'>
                            <div className='border-b z-50 h-16 sticky top-0 flex justify-between items-center px-4'>
                                <div className='flex items-center gap-3'>
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src="" />
                                        <AvatarFallback className='bg-primary text-primary-foreground text-xs'>
                                            <User className='h-4 w-4' />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-medium'>John Doe</span>
                                        <span className='text-xs text-muted-foreground'>john@example.com</span>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">
                                    Sign Out
                                </Button>
                            </div>
                            <div className='p-4'>
                                {rightNavContent}
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    )
}