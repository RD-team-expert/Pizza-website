'use client'

import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useSettings } from '../contexts/SettingsContext'

export function Footer() {
  const { settings } = useSettings();
  
  return (
    <footer className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">
            {settings?.website_title?.split('-')[0] || "PNE PIZZA"}
          </h3>
          <p className="text-sm">Authorized Little Caesars Franchise</p>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-sm hover:underline">Home</a></li>
            <li><a href="#locations" className="text-sm hover:underline">Locations</a></li>
            <li><a href="/about" className="text-sm hover:underline">About Us</a></li>
            <li><a href="#careers" className="text-sm hover:underline">Find a job</a></li>
            <li><a href="/sell-your-store" className="text-sm hover:underline">Sell Your Store</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            {settings?.facebook_url && (
              <a href={settings.facebook_url.startsWith('http') ? settings.facebook_url : `https://facebook.com/${settings.facebook_url}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 aria-label="Facebook" 
                 className="hover:text-orange-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            )}
            {settings?.instagram_url && (
              <a href={settings.instagram_url.startsWith('http') ? settings.instagram_url : `https://instagram.com/${settings.instagram_url}`}
                 target="_blank" 
                 rel="noopener noreferrer"
                 aria-label="Instagram" 
                 className="hover:text-orange-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            )}
            <a href="#" aria-label="Twitter" className="hover:text-orange-300 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}