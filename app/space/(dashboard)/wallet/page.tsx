import AppBody from '@/components/app-layout/AppBody'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wallet, CreditCard, TrendingUp, Download } from 'lucide-react'
import React from 'react'

export default function WalletPage() {
    return (
        <AppBody
            heading='Wallet'
            subHeading='Manage your credits and subscription.'
        >
            <div className='grid gap-6 md:grid-cols-2'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Available Credits</CardTitle>
                        <Wallet className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>1,250</div>
                        <p className='text-xs text-muted-foreground'>Expires in 30 days</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>This Month</CardTitle>
                        <TrendingUp className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>347</div>
                        <p className='text-xs text-muted-foreground'>Credits used</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Subscription</CardTitle>
                            <CardDescription>Manage your subscription and billing</CardDescription>
                        </div>
                        <Button variant='outline'>
                            <CreditCard className='h-4 w-4 mr-2' />
                            Manage
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 border rounded-lg bg-primary/5'>
                            <div>
                                <h4 className='font-medium'>Pro Plan</h4>
                                <p className='text-sm text-muted-foreground'>$19.99/month • Renews on Jan 15, 2025</p>
                            </div>
                            <div className='text-right'>
                                <div className='text-sm font-medium text-primary'>Active</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Transaction History</CardTitle>
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
                        <div className='flex items-center justify-between py-2'>
                            <div>
                                <p className='font-medium'>Monthly subscription</p>
                                <p className='text-sm text-muted-foreground'>Dec 15, 2024</p>
                            </div>
                            <div className='text-right'>
                                <p className='font-medium text-green-600'>+1000 credits</p>
                                <p className='text-sm text-muted-foreground'>$19.99</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between py-2'>
                            <div>
                                <p className='font-medium'>AI flashcard generation</p>
                                <p className='text-sm text-muted-foreground'>Dec 12, 2024</p>
                            </div>
                            <div className='text-right'>
                                <p className='font-medium text-red-600'>-25 credits</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between py-2'>
                            <div>
                                <p className='font-medium'>Practice session</p>
                                <p className='text-sm text-muted-foreground'>Dec 10, 2024</p>
                            </div>
                            <div className='text-right'>
                                <p className='font-medium text-red-600'>-5 credits</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppBody>
    )
}
