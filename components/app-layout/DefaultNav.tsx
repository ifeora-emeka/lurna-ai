'use client'
import React from 'react'
import EachNavLink from './EachNavLink'
import { Home, Wallet, Settings, Users, BookOpen, CompassIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function DefaultNav() {
  const pathname = usePathname()
  return (
    <nav className='space-y-6'>
      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Dashboard
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='Space'
            href='/space'
            icon={<Home className='h-4 w-4' />}
            active={pathname === '/space' || pathname === '/space/'}
          />
          <EachNavLink
            label='Discover'
            href='/space/discover'
            icon={<CompassIcon className='h-4 w-4' />}
            active={pathname === '/space/discover'}
          />
          
        </div>
      </div>
      

      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Account
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='Wallet'
            href='/space/wallet'
            icon={<Wallet className='h-4 w-4' />}
            active={pathname.includes('/space/wallet')}
          />
          <EachNavLink
            label='Settings'
            href='/space/settings'
            icon={<Settings className='h-4 w-4' />}
            active={pathname.includes('/space/settings')}
          />
        </div>
      </div>
    </nav>
  )
}
