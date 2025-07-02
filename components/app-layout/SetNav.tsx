'use client'
import React from 'react'
import EachNavLink from './EachNavLink'
import {  Settings, Users, ArrowLeft, Route, GalleryVertical, File, ListChecks } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export default function SetNav() {
  const params = useParams();
  const path = `/space/set/${params.set_slug}`; 

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
            label='Learning Path'
            href={path}
            icon={<Route className='h-4 w-4' />}
          />
          <EachNavLink
            label='Flashcards'
            href={`${path}/flashcards`}
            icon={<GalleryVertical className='h-4 w-4' />}
          />
          <EachNavLink
            label='Files'
            href={`${path}/files`}
            icon={<File className='h-4 w-4' />}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4'>
          Manage
        </h3>
        <div className='space-y-1'>
          <EachNavLink
            label='Curriculum'
            href={`${path}/curriculum`}
            icon={<ListChecks className='h-4 w-4' />}
          />
          <EachNavLink
            label='Edit Set'
            href={`${path}/edit`}
            icon={<Settings className='h-4 w-4' />}
          />
          <EachNavLink
            label='Collaborators'
            href={`${path}/collaborators`}
            icon={<Users className='h-4 w-4' />}
          />
        </div>
      </div>
    </nav>
  )
}
