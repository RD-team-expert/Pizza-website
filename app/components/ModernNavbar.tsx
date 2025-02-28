'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useSettings } from '../contexts/SettingsContext'

export function ModernNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const { settings, loading } = useSettings();

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const targetId = href.substring(1);
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll as EventListener);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll as EventListener);
      });
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '/') {
      // If we're not on home page and trying to go home, reload the page
      if (!isHomePage) {
        window.location.href = '/';
        return;
      }
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (!isHomePage) {
        router.push('/');
        setTimeout(() => {
          scrollToElement(targetId);
        }, 100);
      } else {
        scrollToElement(targetId);
      }
    } else {
      router.push(href);
    }
  };

  // Add this helper function after the handleSmoothScroll function
  const scrollToElement = (targetId: string) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      const yOffset = -100; // Adjust this value to account for any fixed headers
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isHomePage) {
      window.location.href = '/';
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50 bg-white bg-opacity-60 shadow-lg transition-all duration-300 ease-in-out rounded-full px-4">
      <div className="max-w-5xl mx-auto py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" onClick={handleHomeClick}>
              {settings?.logo_image ? (
                <Image 
                  src={settings.logo_image} 
                  alt={settings.website_title || "PNE PIZZA Logo"} 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Image 
                  src="/placeholder.svg" 
                  alt="PNE PIZZA Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </Link>
            <div className="hidden md:flex items-center ml-6 space-x-6">
              <NavLink href="/" handleSmoothScroll={handleHomeClick}>Home</NavLink>
              <NavLink href="/about" handleSmoothScroll={handleSmoothScroll}>About</NavLink>
              {/* <NavLink href="#locations" handleSmoothScroll={handleSmoothScroll}>Locations</NavLink> */}
              {/* <NavLink href="#community" handleSmoothScroll={handleSmoothScroll}>Community</NavLink> */}
              <NavLink href="/careers" handleSmoothScroll={handleSmoothScroll}>Jobs</NavLink>
              <NavLink href="#contact" handleSmoothScroll={handleSmoothScroll}>Contact</NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* CTA Buttons for desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/menu">
                <Button className="bg-primary text-white text-sm px-4 py-1 h-auto rounded-full hover:bg-primary/90 transition-colors duration-200">
                  Order Now
                </Button>
              </Link>
              <Link href="/locations">
                <Button variant="outline" className="border-primary text-primary text-sm px-4 py-1 h-auto rounded-full hover:bg-primary/10 transition-colors duration-200">
                  Find Locations
                </Button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-3">
            <NavLink href="/" mobile handleSmoothScroll={handleHomeClick}>Home</NavLink>
            <NavLink href="/about" mobile handleSmoothScroll={handleSmoothScroll}>About</NavLink>
            <NavLink href="#locations" mobile handleSmoothScroll={handleSmoothScroll}>Locations</NavLink>
            {/* <NavLink href="#community" mobile handleSmoothScroll={handleSmoothScroll}>Community</NavLink> */}
            <NavLink href="#careers" mobile handleSmoothScroll={handleSmoothScroll}>Jobs</NavLink>
            {/* <NavLink href="/sell-your-store" mobile handleSmoothScroll={handleSmoothScroll}>Sell Your Store</NavLink> */}
            <NavLink href="#contact" mobile handleSmoothScroll={handleSmoothScroll}>Contact</NavLink>
          </div>
          {/* <div className="px-2 pt-4 pb-3 border-t border-gray-200">
            <Button className="w-full bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-primary/90 transition-colors duration-200">Order Now</Button>
          </div> */}
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children, mobile = false, handleSmoothScroll }: { 
  href: string; 
  children: React.ReactNode; 
  mobile?: boolean;
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const baseClasses = "text-primary hover:bg-primary hover:text-white px-3 py-1 rounded-full text-sm font-medium font-pizza"
  const mobileClasses = "block text-base font-medium"
  const classes = mobile ? `${baseClasses} ${mobileClasses}` : baseClasses

  return (
    <a href={href} className={classes} onClick={(e) => handleSmoothScroll(e, href)}>
      {children}
    </a>
  )
}

