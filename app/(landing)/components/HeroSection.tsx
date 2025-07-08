import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 min-h-screen">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
            
            <div className="container relative mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-10 text-center space-y-8">
                    <div className="space-y-6 max-w-4xl">
                        <div className="flex items-center justify-center">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z" fill="currentColor"/>
                                </svg>
                                Powered by Advanced AI
                            </Badge>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins tracking-tight">
                            Transform Your 
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> PDFs</span>
                            <br />
                            Into Smart Learning
                        </h1>
                        
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Upload your course materials and let our AI create personalized learning paths with interactive quizzes, flashcards, and adaptive assessments.
                        </p>
                        
                        <div className="flex flex-col items-center gap-4 pt-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
                                Upload Your PDF
                                <span className="ml-2">→</span>
                            </Button>
                            <p className="text-sm text-muted-foreground">Start for free, no credit card required</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full pt-12">
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                    <Image 
                                        src="/icons/upload-process.svg" 
                                        alt="Upload & Process" 
                                        width={48} 
                                        height={48} 
                                        className="w-12 h-12"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Upload & Process</h3>
                                <p className="text-sm text-muted-foreground">
                                    Simply upload your PDF materials and our AI will analyze and structure the content
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                    <Image 
                                        src="/icons/learn-interactive.svg" 
                                        alt="Learn Interactively" 
                                        width={48} 
                                        height={48} 
                                        className="w-12 h-12"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Learn Interactively</h3>
                                <p className="text-sm text-muted-foreground">
                                    Engage with quizzes, flashcards, and games designed to reinforce your learning
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                    <Image 
                                        src="/icons/track-progress.svg" 
                                        alt="Track Progress" 
                                        width={48} 
                                        height={48} 
                                        className="w-12 h-12"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
                                <p className="text-sm text-muted-foreground">
                                    Monitor your learning journey with detailed analytics and personalized feedback
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-8 pt-12 max-w-md sm:max-w-none">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <Avatar className="w-8 h-8 border-2 border-background">
                                    <AvatarFallback className="bg-primary/20 text-primary text-sm">J</AvatarFallback>
                                </Avatar>
                                <Avatar className="w-8 h-8 border-2 border-background">
                                    <AvatarFallback className="bg-secondary/20 text-secondary text-sm">M</AvatarFallback>
                                </Avatar>
                                <Avatar className="w-8 h-8 border-2 border-background">
                                    <AvatarFallback className="bg-accent/20 text-accent-foreground text-sm">S</AvatarFallback>
                                </Avatar>
                            </div>
                            <span className="text-sm text-muted-foreground">Join 10,000+ learners</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-primary text-sm">★</span>
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-1">4.9/5 rating</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-muted-foreground">Free to start</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    )
}
