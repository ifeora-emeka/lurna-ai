'use client'

import AppBody from '@/components/app-layout/AppBody'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, CreditCard, TrendingUp, Download, Crown, Zap, Star, ArrowUp } from 'lucide-react'
import React from 'react'
import { useAuth } from '@/context/auth.context'

const TIER_NAMES = {
    0: 'Free',
    1: 'Starter',
    2: 'Pro',
    3: 'Premium'
}

const TIER_COLORS = {
    0: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    2: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    3: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
}

const TIER_ICONS = {
    0: <Zap className='h-4 w-4' />,
    1: <Star className='h-4 w-4' />,
    2: <Crown className='h-4 w-4' />,
    3: <Crown className='h-4 w-4' />
}

export default function WalletPage() {
    const { wallet, user } = useAuth()

    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(balance)
    }

    const getTierName = (tier: number) => TIER_NAMES[tier as keyof typeof TIER_NAMES] || 'Unknown'
    const getTierColor = (tier: number) => TIER_COLORS[tier as keyof typeof TIER_COLORS] || TIER_COLORS[0]
    const getTierIcon = (tier: number) => TIER_ICONS[tier as keyof typeof TIER_ICONS] || TIER_ICONS[0]

    return (
        <AppBody
            heading='Wallet'
            subHeading='Manage your credits and subscription.'
        >
            <div className='grid gap-6 md:grid-cols-2'>
                <Card className='relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full -translate-y-8 translate-x-8' />
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative'>
                        <CardTitle className='text-sm font-medium'>Wallet Balance</CardTitle>
                        <div className='p-2 bg-primary/10 rounded-full'>
                            <Wallet className='h-4 w-4 text-primary' />
                        </div>
                    </CardHeader>
                    <CardContent className='relative'>
                        <div className='text-3xl font-bold text-primary'>
                            {wallet ? formatBalance(wallet.totalBalance) : '0'}
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                            <p className='text-sm text-muted-foreground'>Credits</p>
                            <Badge variant='secondary' className='text-xs'>
                                Tier {wallet?.tier || 0}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className='relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-full -translate-y-8 translate-x-8' />
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 relative'>
                        <CardTitle className='text-sm font-medium'>Current Plan</CardTitle>
                        <div className='p-2 bg-secondary/10 rounded-full'>
                            {getTierIcon(wallet?.tier || 0)}
                        </div>
                    </CardHeader>
                    <CardContent className='relative'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='text-2xl font-bold'>
                                {getTierName(wallet?.tier || 0)}
                            </div>
                            <Badge className={getTierColor(wallet?.tier || 0)}>
                                {getTierName(wallet?.tier || 0)}
                            </Badge>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button size='sm' className='flex items-center gap-2'>
                                <ArrowUp className='h-3 w-3' />
                                Upgrade Plan
                            </Button>
                            <Button variant='outline' size='sm'>
                                <CreditCard className='h-4 w-4 mr-2' />
                                Manage
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <div>
                                <CardTitle className='flex items-center gap-2'>
                                    <Crown className='h-5 w-5 text-primary' />
                                    Plan Details
                                </CardTitle>
                                <CardDescription>Your subscription information</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-6'>
                            <div className='p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5'>
                                <div className='flex items-center justify-between mb-3'>
                                    <div className='flex items-center gap-2'>
                                        <div className='p-2 bg-primary/10 rounded-full'>
                                            {getTierIcon(wallet?.tier || 0)}
                                        </div>
                                        <div>
                                            <h4 className='font-semibold text-lg'>{getTierName(wallet?.tier || 0)} Plan</h4>
                                            <p className='text-sm text-muted-foreground'>
                                                {wallet?.tier === 0 ? 'Basic features included' : 'Advanced features included'}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className={getTierColor(wallet?.tier || 0)}>
                                        Active
                                    </Badge>
                                </div>
                                
                                <div className='space-y-3'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-muted-foreground'>Monthly credits</span>
                                        <span className='font-medium'>
                                            {wallet?.tier === 0 ? '100' : wallet?.tier === 1 ? '1,000' : wallet?.tier === 2 ? '5,000' : '10,000'}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-muted-foreground'>AI assessments</span>
                                        <span className='font-medium'>
                                            {wallet?.tier === 0 ? '5/month' : 'Unlimited'}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-muted-foreground'>Priority support</span>
                                        <span className='font-medium'>
                                            {wallet?.tier && wallet.tier > 1 ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {wallet?.tier === 0 && (
                                <div className='p-4 border border-primary/20 rounded-lg bg-primary/5'>
                                    <h5 className='font-medium mb-2'>Upgrade Benefits</h5>
                                    <ul className='text-sm text-muted-foreground space-y-1'>
                                        <li>• 10x more credits monthly</li>
                                        <li>• Unlimited AI assessments</li>
                                        <li>• Priority support</li>
                                        <li>• Advanced analytics</li>
                                    </ul>
                                    <Button className='w-full mt-3' size='sm'>
                                        <ArrowUp className='h-4 w-4 mr-2' />
                                        Upgrade to Pro
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <div>
                                <CardTitle className='flex items-center gap-2'>
                                    <TrendingUp className='h-5 w-5 text-primary' />
                                    Transaction History
                                </CardTitle>
                                <CardDescription>Your recent credit transactions</CardDescription>
                            </div>
                            <Button variant='outline' size='sm'>
                                <Download className='h-4 w-4 mr-2' />
                                Export
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {/* Sample transactions - in real app, this would come from the Transaction model */}
                            <div className='flex items-center justify-between py-3 border-b border-border/50'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-full'>
                                        <CreditCard className='h-4 w-4 text-green-600 dark:text-green-400' />
                                    </div>
                                    <div>
                                        <p className='font-medium'>Monthly subscription</p>
                                        <p className='text-sm text-muted-foreground'>Dec 15, 2024</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium text-green-600'>+1,000 credits</p>
                                    <p className='text-sm text-muted-foreground'>$19.99</p>
                                </div>
                            </div>
                            
                            <div className='flex items-center justify-between py-3 border-b border-border/50'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full'>
                                        <Zap className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                                    </div>
                                    <div>
                                        <p className='font-medium'>AI flashcard generation</p>
                                        <p className='text-sm text-muted-foreground'>Dec 12, 2024</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium text-red-600'>-25 credits</p>
                                    <Badge variant='secondary' className='text-xs'>Assessment</Badge>
                                </div>
                            </div>
                            
                            <div className='flex items-center justify-between py-3 border-b border-border/50'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full'>
                                        <Star className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                                    </div>
                                    <div>
                                        <p className='font-medium'>Practice session</p>
                                        <p className='text-sm text-muted-foreground'>Dec 10, 2024</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium text-red-600'>-5 credits</p>
                                    <Badge variant='secondary' className='text-xs'>Practice</Badge>
                                </div>
                            </div>
                            
                            <div className='flex items-center justify-between py-3'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full'>
                                        <Crown className='h-4 w-4 text-amber-600 dark:text-amber-400' />
                                    </div>
                                    <div>
                                        <p className='font-medium'>Bonus credits</p>
                                        <p className='text-sm text-muted-foreground'>Dec 8, 2024</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='font-medium text-green-600'>+100 credits</p>
                                    <Badge variant='secondary' className='text-xs'>Bonus</Badge>
                                </div>
                            </div>
                        </div>
                        
                        <div className='mt-6 pt-4 border-t border-border/50'>
                            <Button variant='outline' className='w-full'>
                                View All Transactions
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppBody>
    )
}
