// Metadata configuration for different pages
export const pageMetadata = {
  home: {
    title: 'PNE Pizza - Delicious Pizza Near You',
    description: 'Find the best pizza in town at PNE Pizza. Order online for delivery or pickup.',
    keywords: 'pizza, delivery, takeout, PNE Pizza, restaurant',
  },
  locations: {
    title: 'Find PNE Pizza Locations Near You',
    description: 'Locate your nearest PNE Pizza restaurant. View our store locations across the country.',
    keywords: 'pizza locations, PNE Pizza near me, pizza restaurant locations, store finder',
  },
  about: {
    title: 'About PNE Pizza - Our Story',
    description: 'Learn about PNE Pizza\'s journey, our values, and our commitment to quality pizza.',
    keywords: 'about PNE Pizza, pizza history, pizza company, pizza values',
  },
  careers: {
    title: 'Careers at PNE Pizza - Join Our Team',
    description: 'Explore job opportunities at PNE Pizza. Join our team and grow your career with us.',
    keywords: 'pizza jobs, restaurant careers, PNE Pizza employment, food service jobs',
  },
  sellYourStore: {
    title: 'Sell Your Pizza Store to PNE Pizza',
    description: 'Looking to sell your pizza franchise? PNE Pizza is interested in acquiring successful pizza locations.',
    keywords: 'sell pizza franchise, pizza store acquisition, franchise sales, restaurant selling',
  },
  contact: {
    title: 'Contact PNE Pizza - Get in Touch',
    description: 'Have questions? Contact PNE Pizza for customer service, feedback, or business inquiries.',
    keywords: 'contact pizza restaurant, pizza customer service, pizza feedback',
  },
}

// Helper function to get metadata with fallback to settings
export function getPageMetadata(page: keyof typeof pageMetadata, settings?: any) {
  const metadata = pageMetadata[page];
  
  return {
    title: metadata.title || (settings?.website_title || 'PNE Pizza'),
    description: metadata.description || (settings?.description || 'Your local pizza restaurant'),
    keywords: metadata.keywords || (settings?.keywords || 'pizza, restaurant'),
  };
}