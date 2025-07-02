'use client'
import React from 'react'
import { Button } from '../ui/button'
import { AlignLeft } from 'lucide-react'
import { useLayout } from '@/context/layout.context'

type Props = {
    children?: React.ReactNode;
    heading?: string;
    subHeading?: string;
    headerRightContent?: React.ReactNode;
}

export default function AppBody({ children, heading, subHeading, headerRightContent }: Props) {
    const { toggleNav } = useLayout()

    return (
        <main className='flex-1 h-screen flex flex-col to-accent/10'>
            <header className='border-b backdrop-blur z-40 h-16 sticky top-0 flex justify-between items-center px-4 md:px-6 select-none'>
                <div className='flex items-center gap-3 max-w-[70%] flex-1'>
                    <Button 
                        size='icon' 
                        variant='ghost' 
                        className='md:hidden hover:bg-accent/50' 
                        onClick={toggleNav}
                    >
                        <AlignLeft className='h-4 w-4' />
                    </Button>
                    <div className='grid grid-cols-1'>
                        {heading && (
                            <h1 className='text-lg font-semibold text-foreground truncate'>{heading}</h1>
                        )}
                        {subHeading && (
                            <p className='text-sm text-muted-foreground truncate'>{subHeading}</p>
                        )}
                    </div>
                </div>
                {headerRightContent && (
                    <div className='flex items-center gap-2'>
                        {headerRightContent}
                    </div>
                )}
            </header>
            <div className='flex-1 overflow-auto'>
                <div className='p-4 md:p-6 space-y-6 max-w-7xl mx-auto'>
                    {children}
                </div>
            </div>
        </main>
    )
}