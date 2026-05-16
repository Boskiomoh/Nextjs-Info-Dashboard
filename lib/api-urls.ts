// lib/api-config.ts

export const API_CONFIG = {
  // 1. Internal Base URL (For your own /api calls)
  // Logic: Use the ENV variable if it exists, otherwise build it dynamically
  getInternalBaseUrl: () => {
    if (typeof window !== 'undefined') return ''; // Browser uses relative paths
    
    // If we are on Vercel, it provides VERCEL_URL automatically
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    
    // Fallback to your .env variable or localhost
    // We remove '/api' from the end if it's there to keep it clean
    return process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';
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