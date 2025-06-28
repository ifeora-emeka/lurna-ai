'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export default function EachNavLink({ label, href, icon, active }: Props) {
    const pathname = usePathname()
    const isActive = active || pathname === href || pathname.startsWith(href + '/')

    return (
        <Link 
            href={href}
            className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground group relative',
                isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}
        >
            {icon && (
                <span className={cn(
                    'flex-shrink-0 transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}>
                    {icon}
                </span>
            )}
            <span className='truncate'>{label}</span>
        </Link>
    )
}