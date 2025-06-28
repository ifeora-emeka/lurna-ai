import React from 'react'
import EachNavLink from './EachNavLink'
import { Book, Play, BarChart3, Settings, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SetNav() {
  return (
    <nav className='space-y-6'>
      <div className='flex items-center gap-3 mb-6 p-3 bg-accent/30 rounded-xl border'>
        <Button variant='ghost' size='icon' asChild className='h-8 w-8 hover:bg-background'>
          <Link href='/space'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <div className='flex-1'>
          <h2 className='font-semibold text-foreground text-sm'>Learning Set</h2>
          <p className='text-xs text-muted-foreground'>Mathematics Basics</p>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Study
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='Overview'
            href='/set/123'
            icon={<Book className='h-4 w-4' />}
          />
          <EachNavLink
            label='Practice'
            href='/set/123/practice'
            icon={<Play className='h-4 w-4' />}
          />
          <EachNavLink
            label='Progress'
            href='/set/123/progress'
            icon={<BarChart3 className='h-4 w-4' />}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Manage
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='Edit Set'
            href='/set/123/edit'
            icon={<Settings className='h-4 w-4' />}
          />
          <EachNavLink
            label='Collaborators'
            href='/set/123/collaborators'
            icon={<Users className='h-4 w-4' />}
          />
        </div>
      </div>
    </nav>
  )
}
