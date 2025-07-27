// LLM-based tone adjustment for LinkedIn posts

/**
 * Analyzes if a header uses first-person voice
 */
const isFirstPersonHeader = (header) => {
  const firstPersonIndicators = ['i ', 'my ', 'mine ', 'myself '];
  const lowerHeader = header.toLowerCase();
  
  // Check for "me" at the end or followed by non-letter
  const hasMe = /\bme\b/.test(lowerHeader);
  
  return firstPersonIndicators.some(indicator => lowerHeader.includes(indicator)) || hasMe;
};

/**
 * Adjusts ikigai text tone to match header voice using LLM
 */
const adjustIkigaiTone = async (ikigaiText, headerText) => {
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
const fallbackToneAdjustment = (ikigaiText, headerText) => {
  const isFirstPerson = isFirstPersonHeader(headerText);
  
  if (!isFirstPerson) {
    return {
      adjustedText: ikigaiText,
      wasAdjusted: false
    };
  }

  // Only adjust if there are actually pronouns to replace
  const hasPronouns = /\b(Your|your|You|you)\b/.test(ikigaiText);
  
  if (!hasPronouns) {
    return {
      adjustedText: ikigaiText,
      wasAdjusted: false
    };
  }

  // Simple fallback: replace pronouns with proper case handling and verb agreement
  let adjustedText = ikigaiText
    .replace(/\bYour\b/g, 'My')
    .replace(/\byour\b/g, 'my')
    .replace(/\bYou\b/g, 'I')
    .replace(/\byou\b/g, 'I')
    .replace(/\bYOUR\b/g, 'MY')
    .replace(/\bYOU\b/g, 'I')
    // Fix verb agreement: "you are" -> "I am"
    .replace(/\bI are\b/g, 'I am')
    .replace(/\bi are\b/g, 'I am');

  return {
    adjustedText,
    wasAdjusted: true
  };
};

// For testing purposes
const isFirstPersonHeaderExport = isFirstPersonHeader;

// CommonJS exports
module.exports = {
  adjustIkigaiTone,
  fallbackToneAdjustment,
  isFirstPersonHeaderExport
}; 