import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    size?: number
    className?: string
}

export default function AssistantAvatar({ size, className }: Props) {
    return (
        <Image
            src="/assistant/1.jpg"
            alt="Lurna AI"
            width={size || 60}
            height={size || 60}
            className={cn('rounded-full shadow-sm border border-secondary', className)}
        />
    )
}