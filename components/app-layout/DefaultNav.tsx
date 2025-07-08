import React from 'react'
import EachNavLink from './EachNavLink'
import { Home, Wallet, Settings, Users, BookOpen } from 'lucide-react'

export default function DefaultNav() {
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
          />
          <EachNavLink
            label='Wallet'
            href='/space/wallet'
            icon={<Wallet className='h-4 w-4' />}
          />
        </div>
      </div>
      
      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Learning
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='My Sets'
            href='/sets'
            icon={<BookOpen className='h-4 w-4' />}
          />
          <EachNavLink
            label='Community'
            href='/community'
            icon={<Users className='h-4 w-4' />}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Account
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='Settings'
            href='/settings'
            icon={<Settings className='h-4 w-4' />}
          />
        </div>
      </div>
    </nav>
  )
}
