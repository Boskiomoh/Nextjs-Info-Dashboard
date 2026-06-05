// lib/api-config.ts

export const API_CONFIG = {
  // 1. Internal Base URL (For your own /api calls)
  // Logic: Use the ENV variable if it exists, otherwise build it dynamically
  getInternalBaseUrl: () => {
    if (typeof window !== 'undefined') return ''; // Browser uses relative paths
    
    // If we are on Vercel, it provides VERCEL_URL automatically
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
      throw new Error('NEXT_PUBLIC_API_URL environment variable is missing');
    }
    return url.replace('/api', '');
  },

  // 2. Dev.to External API Switcher
  getDevToUrl: () => {
    return process.env.NODE_ENV === 'development'
      ? process.env.DEVTO_API_URL 
      : process.env.DEVTO_PROD_API_URL ;
  },

  // 3. Crypto API (Since it's the same for both usually)
  getCryptoUrl: () => {
    return process.env.NEXT_PUBLIC_CRYPTO_API_URL;
  }
};