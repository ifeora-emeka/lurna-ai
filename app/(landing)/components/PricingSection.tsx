import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { pricingPlans, creditPricing } from '../data/pricing.data'
import Image from 'next/image'

export default function PricingSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4">
                        Pricing
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4">
                        Choose Your
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> Learning Plan</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start for free with ₦1,000 credits monthly, then scale as you grow
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pricingPlans.map((plan) => (
                        <Card key={plan.id} className={`relative bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 ${
                            plan.popular ? 'border-primary/50 shadow-lg scale-105' : ''
                        }`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                                    variant={plan.buttonVariant}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold mb-4">Credit Pricing</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Pay only for what you use with our transparent credit system
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {creditPricing.map((credit) => (
                        <Card key={credit.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 text-center">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                                    <Image 
                                        src={credit.icon} 
                                        alt={credit.name} 
                                        width={48} 
                                        height={48} 
                                        className="w-12 h-12"
                                    />
                                </div>
                                <h4 className="font-semibold mb-2">{credit.name}</h4>
                                <div className="text-2xl font-bold text-primary mb-1">{credit.price}</div>
                                <p className="text-sm text-muted-foreground">{credit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-sm text-muted-foreground">
                        All plans include our core features. Upgrade or downgrade at any time.
                    </p>
                </div>
            </div>
        </section>
    )
}
