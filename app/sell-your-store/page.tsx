
'use client'
import { ModernNavbar } from '../components/ModernNavbar'
import { SellYourStore } from '../components/SellYourStore'
import { Footer } from '../components/Footer'
import { SmoothScroll } from '../components/SmoothScroll'
import { DynamicMetadata } from '../components/DynamicMetadata'

export default function SellYourStorePage() {
  return (
    <SmoothScroll>
      <DynamicMetadata page="sellYourStore" />
      <ModernNavbar />
      <main className="flex min-h-screen flex-col">
        <div className="flex-grow">
          <SellYourStore />
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  )
}

