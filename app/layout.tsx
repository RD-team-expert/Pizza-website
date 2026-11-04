import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SettingsProvider } from './contexts/SettingsContext'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

// Default metadata that will be overridden by dynamic metadata in pages
export const metadata: Metadata = {
  title: 'PNE Pizza',
  description: 'Your local pizza restaurant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SettingsProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </SettingsProvider>
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          strategy="afterInteractive"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6ac535d3c4072640324764e6"
          data-source="WEB_USER"
        />
      </body>
    </html>
  )
}