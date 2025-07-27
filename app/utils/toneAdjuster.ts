// LLM-based tone adjustment for LinkedIn posts

interface ToneAdjustmentResult {
  adjustedText: string;
  wasAdjusted: boolean;
}

/**
 * Analyzes if a header uses first-person voice
 */
const isFirstPersonHeader = (header: string): boolean => {
  const firstPersonIndicators = ['i ', 'my ', 'me ', 'mine ', 'myself '];
  const lowerHeader = header.toLowerCase();
  return firstPersonIndicators.some(indicator => lowerHeader.includes(indicator));
};

/**
 * Adjusts ikigai text tone to match header voice using LLM
 */
export const adjustIkigaiTone = async (
  ikigaiText: string, 
  headerText: string
): Promise<ToneAdjustmentResult> => {
  try {
    // Check if header is first-person
    const isFirstPerson = isFirstPersonHeader(headerText);
    
    if (!isFirstPerson) {
      // Keep original text if header is not first-person
      return {
        adjustedText: ikigaiText,
        wasAdjusted: false
      };
    }

    // Use LLM to adjust tone for first-person headers
    const response = await fetch('/api/tone-adjust', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ikigaiText,
        headerText,
        targetVoice: 'first-person'
      }),
    });

    if (!response.ok) {
      console.warn('Tone adjustment failed, using fallback');
      return {
        adjustedText: ikigaiText,
        wasAdjusted: false
      };
    }

    const result = await response.json();
    
    return {
      adjustedText: result.adjustedText,
      wasAdjusted: true
    };

  } catch (error) {
    console.error('Error adjusting tone:', error);
    // Fallback to original text
    return {
      adjustedText: ikigaiText,
      wasAdjusted: false
    };
  }
};

/**
 * Fallback function for simple pronoun replacement when LLM is unavailable
 */
export const fallbackToneAdjustment = (ikigaiText: string, headerText: string): ToneAdjustmentResult => {
  const isFirstPerson = isFirstPersonHeader(headerText);
  
  if (!isFirstPerson) {
    return {
      adjustedText: ikigaiText,
      wasAdjusted: false
    };
  }

  // Simple fallback: replace "Your" with "My" and "you" with "I"
  let adjustedText = ikigaiText
    .replace(/\bYour\b/g, 'My')
    .replace(/\byour\b/g, 'my')
    .replace(/\bYou\b/g, 'I')
    .replace(/\byou\b/g, 'I');

  return {
    adjustedText,
    wasAdjusted: true
  };
};

// For testing purposes
export const isFirstPersonHeaderExport = isFirstPersonHeader; 