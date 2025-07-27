// Mobile detection and LinkedIn app handling utilities

/**
 * Detects if the user is on a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Check for mobile user agents
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  return mobileRegex.test(userAgent);
};

/**
 * Detects if the user is on iOS
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /iPad|iPhone|iPod/.test(userAgent);
};

/**
 * Detects if the user is on Android
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /Android/.test(userAgent);
};

/**
 * Opens LinkedIn with mobile app support
 * Falls back to web version if app is not available
 */
export const openLinkedIn = (url: string = 'https://ikigen.vercel.app'): void => {
  const isMobile = isMobileDevice();
  const isIOSDevice = isIOS();
  const isAndroidDevice = isAndroid();
  
  if (isMobile) {
    if (isIOSDevice) {
      // iOS LinkedIn app URL scheme
      const linkedInAppUrl = `linkedin://post?text=${encodeURIComponent('Check out my Ikigai journey!')}&url=${encodeURIComponent(url)}`;
      
      // Try to open the app first
      const appWindow = window.open(linkedInAppUrl, '_blank');
      
      // If app doesn't open, fall back to web after a short delay
      setTimeout(() => {
        if (appWindow && appWindow.closed) {
          // App didn't open, use web version
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        }
      }, 1000);
      
    } else if (isAndroidDevice) {
      // Android LinkedIn app intent
      const linkedInAppUrl = `intent://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}#Intent;package=com.linkedin.android;scheme=https;end`;
      
      // Try to open the app first
      const appWindow = window.open(linkedInAppUrl, '_blank');
      
      // If app doesn't open, fall back to web after a short delay
      setTimeout(() => {
        if (appWindow && appWindow.closed) {
          // App didn't open, use web version
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        }
      }, 1000);
      
    } else {
      // Other mobile devices - use web version
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
  } else {
    // Desktop - use web version
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  }
};

/**
 * Enhanced LinkedIn sharing with mobile app support
 */
export const shareToLinkedIn = async (
  text: string,
  url: string = 'https://ikigen.vercel.app'
): Promise<void> => {
  try {
    // Copy text to clipboard first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    }
    
    // Open LinkedIn with mobile app support
    openLinkedIn(url);
    
  } catch (error) {
    console.error('Error sharing to LinkedIn:', error);
    
    // Fallback to web version
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  }
}; 