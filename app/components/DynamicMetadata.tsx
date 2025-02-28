'use client'

import { useEffect } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import { getPageMetadata } from '@/lib/metadata'

interface DynamicMetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  page?: 'home' | 'locations' | 'about' | 'careers' | 'sellYourStore' | 'contact';
}

export function DynamicMetadata({ 
  title, 
  description, 
  keywords,
  page
}: DynamicMetadataProps = {}) {
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (!loading) {
      // Get metadata from page prop or use provided values
      let metaTitle = title;
      let metaDescription = description;
      let metaKeywords = keywords;
      
      // If page is specified, use page-specific metadata
      if (page && !title && !description && !keywords) {
        const pageMetadata = getPageMetadata(page, settings);
        metaTitle = pageMetadata.title;
        metaDescription = pageMetadata.description;
        metaKeywords = pageMetadata.keywords;
      }
      
      // Fallback to settings
      metaTitle = metaTitle || settings?.website_title || 'PNE Pizza';
      metaDescription = metaDescription || settings?.description || 'Your local pizza restaurant';
      metaKeywords = metaKeywords || settings?.keywords || 'pizza, restaurant';
      
      // Update document title
      document.title = metaTitle;
      
      // Update meta description
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', metaDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = metaDescription;
        document.head.appendChild(meta);
      }
      
      // Add keywords meta tag
      const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
      if (metaKeywordsTag) {
        metaKeywordsTag.setAttribute('content', metaKeywords);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = metaKeywords;
        document.head.appendChild(meta);
      }
      
      // Add Open Graph tags
      updateOpenGraphTag('og:title', metaTitle);
      updateOpenGraphTag('og:description', metaDescription);
      
      // Add Open Graph image if available
      if (settings?.Google_Analytics_ID && settings.Google_Analytics_ID.includes('og-image')) {
        updateOpenGraphTag('og:image', settings.Google_Analytics_ID);
      }
    }
  }, [settings, loading, title, description, keywords, page]);

  // Helper function to update or create Open Graph tags
  const updateOpenGraphTag = (property: string, content: string) => {
    const tag = document.querySelector(`meta[property="${property}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.content = content;
      document.head.appendChild(meta);
    }
  };

  return null; // This component doesn't render anything
}