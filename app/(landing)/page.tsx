import React from 'react'
import HeroSection from './components/HeroSection'
import PricingSection from './components/PricingSection'
import FeaturesSection from './components/FeaturesSection'

export default function page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection/>
      <PricingSection/>
    </div>
  )
}
