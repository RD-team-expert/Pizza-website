'use client'

import { Facebook, Instagram, Twitter } from 'lucide-react'
import { ModernNavbar } from './components/ModernNavbar'
import { HeroSection } from './components/HeroSection'
import { LocationsSection } from './components/LocationsSection'
import { CommunityEngagement } from './components/CommunityEngagement'
import { CustomerFeedback } from './components/CustomerFeedback'
import { CareersSection } from './components/CareersSection'
import { ContactUs } from './components/ContactUs'
import { SellYourStorePreview } from './components/SellYourStorePreview'
import { SmoothScroll } from './components/SmoothScroll'
import { DynamicMetadata } from './components/DynamicMetadata'
import { Footer } from './components/Footer'

export default function Home() {
  const handleCommunityEngagementInView = () => {
    // Add your logic here for when the CommunityEngagement section is in view
    // console.log('CommunityEngagement in view');
  };

  return (
    <SmoothScroll>
      <DynamicMetadata page="home" />
      <ModernNavbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <HeroSection />
        <LocationsSection id="locations" className="bg-white" />
        {/* <CommunityEngagement 
          id="community" 
          className="bg-gradient-to-b from-orange-50 via-orange-100 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" 
          onInView={handleCommunityEngagementInView}
        /> */}
        <CustomerFeedback className="bg-gradient-to-b from-orange-50 via-orange-100 to-red-50" />
        <SellYourStorePreview className="bg-white" />
        <CareersSection id="careers" className="bg-gradient-to-b from-orange-50 via-orange-100 to-red-50" />
        <ContactUs id="contact" className="bg-white" />

        <Footer />
      </main>
    </SmoothScroll>
  )
}

