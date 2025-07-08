'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function HeaderNav() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
            isScrolled 
                ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm' 
                : 'bg-background/80 backdrop-blur-sm'
        }`}>
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <span className="text-sm font-bold text-primary-foreground">L</span>
                        </div>
                        <span className="text-xl font-bold font-poppins">Lurna AI</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                            Beta
                        </Badge>
                    </Link>
                    
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/30 p-6 no-underline outline-none focus:shadow-md">
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        AI-Powered Learning
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Transform your PDFs into interactive learning experiences with advanced AI
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                    <div className="text-sm font-medium leading-none">Smart Assessments</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Quizzes, flashcards, and interactive games
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                    <div className="text-sm font-medium leading-none">Personalized Paths</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        Adaptive learning tailored to your progress
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                    Pricing
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                    About
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                        Sign In
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Upload Your PDF
                    </Button>
                    
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                            <span className="text-sm font-bold text-primary-foreground">L</span>
                                        </div>
                                        <span className="text-xl font-bold font-poppins">Lurna AI</span>
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                            Beta
                                        </Badge>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-2 mt-8">
                                    <Button variant="ghost" className="justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                                        Features
                                    </Button>
                                    <Button variant="ghost" className="justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                                        Pricing
                                    </Button>
                                    <Button variant="ghost" className="justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                                        About
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-2 mt-8">
                                    <Button variant="outline" className="w-full">
                                        Sign In
                                    </Button>
                                    <Button className="w-full bg-primary hover:bg-primary/90">
                                        Upload Your PDF
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
