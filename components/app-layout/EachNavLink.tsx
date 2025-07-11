'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export default function EachNavLink({ label, href, icon, active }: Props) {
    return (
        <Link 
            href={href}
            className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-secondary/50 hover:text-secondary-foreground group relative',
                active ? 'bg-secondary/20 border-secondary border' : 'text-muted-foreground hover:text-foreground'
            )}
        >
            {icon && (
                <span className={cn(
                    'flex-shrink-0 transition-colors duration-200',
                    active ? '' : 'text-muted-foreground group-hover:text-foreground'
                )}>
                    {icon}
                </span>
            )}
            <span className='truncate'>{label}</span>
        </Link>
    )
}