import React from 'react'
import HeaderNav from './components/HeaderNav';

type Props = {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
        <div className="min-h-screen bg-background">
            <HeaderNav/>
            {children}
        </div>
    )
}