import { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
      </body>
    </html>
  )
}