'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface WebsiteSettings {
  id: number;
  website_title: string;
  keywords: string;
  description: string;
  Google_Maps_API_Key: string;
  Google_Analytics_ID: string;
  logo_image: string;
  instagram_url: string;
  facebook_url: string;
  created_at: string;
  updated_at: string;
}

interface SettingsContextType {
  settings: WebsiteSettings | null;
  loading: boolean;
  error: string | null;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  loading: true,
  error: null,
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Check if we have cached settings and they're not expired
        const cachedSettings = localStorage.getItem('websiteSettings');
        const cachedTimestamp = localStorage.getItem('websiteSettingsTimestamp');
        
        // Use cached settings if they exist and are less than 1 hour old
        if (cachedSettings && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = new Date().getTime();
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
          
          if (now - timestamp < oneHour) {
            setSettings(JSON.parse(cachedSettings));
            setLoading(false);
            return;
          }
        }
        
        // Fetch fresh settings from our proxy API route
        const response = await fetch('/api/settings');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch settings: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Save to state
          setSettings(data.data);
          
          // Cache in localStorage with timestamp
          localStorage.setItem('websiteSettings', JSON.stringify(data.data));
          localStorage.setItem('websiteSettingsTimestamp', new Date().getTime().toString());
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error('Error fetching website settings:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch website settings');
        
        // Try to use cached settings even if they're expired
        const cachedSettings = localStorage.getItem('websiteSettings');
        if (cachedSettings) {
          setSettings(JSON.parse(cachedSettings));
        }
      } finally {
        setLoading(false);
      }
    };

    // Handle localStorage not being available (SSR)
    if (typeof window !== 'undefined') {
      fetchSettings();
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, error }}>
      {children}
    </SettingsContext.Provider>
  );
}