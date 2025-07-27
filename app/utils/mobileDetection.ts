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
 * Uses a more reliable approach for mobile devices
 */
export const openLinkedIn = (url: string = 'https://ikigen.vercel.app'): void => {
  const isMobile = isMobileDevice();
  const isIOSDevice = isIOS();
  const isAndroidDevice = isAndroid();
  
  if (isMobile) {
    if (isIOSDevice) {
      // iOS: Try multiple approaches for better app opening
      const linkedInAppUrl = `linkedin://post?text=${encodeURIComponent('Check out my Ikigai journey!')}&url=${encodeURIComponent(url)}`;
      const linkedInWebUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      
      // Try to open the app first
      const appWindow = window.open(linkedInAppUrl, '_blank');
      
      // Fall back to web version after a short delay
      setTimeout(() => {
        if (!appWindow || appWindow.closed) {
          window.open(linkedInWebUrl, '_blank');
        }
      }, 500);
      
    } else if (isAndroidDevice) {
      // Android: Use intent URL for better app opening
      const linkedInIntentUrl = `intent://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}#Intent;package=com.linkedin.android;scheme=https;end`;
      const linkedInWebUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      
      // Try to open the app first
      const appWindow = window.open(linkedInIntentUrl, '_blank');
      
      // Fall back to web version after a short delay
      setTimeout(() => {
        if (!appWindow || appWindow.closed) {
          window.open(linkedInWebUrl, '_blank');
        }
      }, 500);
      
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
    
    // Check if Web Share API is available (most reliable for mobile apps)
    if (navigator.share && isMobileDevice()) {
      try {
        await navigator.share({
          title: 'My Ikigai Journey',
          text: text,
          url: url
        });
        return; // Web Share API handled it
      } catch (shareError) {
        console.log('Web Share API failed, falling back to LinkedIn-specific methods');
      }
    }
    
    // For mobile devices, try to open the LinkedIn app with the text content
    const isMobile = isMobileDevice();
    const isIOSDevice = isIOS();
    const isAndroidDevice = isAndroid();
    
    if (isMobile) {
      if (isIOSDevice) {
        // iOS: Try multiple LinkedIn app URL schemes
        const linkedInAppUrl1 = `linkedin://post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        const linkedInAppUrl2 = `linkedin://sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        const linkedInWebUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        
        // Try first app URL
        let appWindow = window.open(linkedInAppUrl1, '_blank');
        
        // If first attempt fails, try second URL
        setTimeout(() => {
          if (!appWindow || appWindow.closed) {
            appWindow = window.open(linkedInAppUrl2, '_blank');
            
            // If both app attempts fail, use web version
            setTimeout(() => {
              if (!appWindow || appWindow.closed) {
                window.open(linkedInWebUrl, '_blank');
              }
            }, 300);
          }
        }, 300);
        
      } else if (isAndroidDevice) {
        // Android: Try multiple approaches
        const linkedInIntentUrl = `intent://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}#Intent;package=com.linkedin.android;scheme=https;end`;
        const linkedInAppUrl = `linkedin://post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        const linkedInWebUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        
        // Try intent URL first
        let appWindow = window.open(linkedInIntentUrl, '_blank');
        
        // If intent fails, try direct app URL
        setTimeout(() => {
          if (!appWindow || appWindow.closed) {
            appWindow = window.open(linkedInAppUrl, '_blank');
            
            // If both app attempts fail, use web version
            setTimeout(() => {
              if (!appWindow || appWindow.closed) {
                window.open(linkedInWebUrl, '_blank');
              }
            }, 300);
          }
        }, 300);
        
      } else {
        // Other mobile devices
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      }
    } else {
      // Desktop
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
    
  } catch (error) {
    console.error('Error sharing to LinkedIn:', error);
    
    // Fallback to web version
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  }
}; 