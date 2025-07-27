// LinkedIn sharing utility functions

const INTRO_HEADERS = [
  "✨ My Ikigai ✨",
  "💡 What Drives Me",
  "🧘‍♀️ My Purpose, Defined",
  "🎨 A Reflection on Meaning",
  "🪷 Why I Wake Up Each Day"
];

const CALL_TO_ACTIONS = [
  "👉 What would your Ikigai say? → https://ikigen.vercel.app",
  "🎯 Discover your own purpose → https://ikigen.vercel.app",
  "✨ Start your journey → https://ikigen.vercel.app",
  "🧭 Reflect. Discover. Align. → https://ikigen.vercel.app",
  "🪞 What drives *you*? → https://ikigen.vercel.app"
];

const generateLinkedInPost = async (ikigaiInsight) => {
  // Randomly select one intro header
  const randomHeader = INTRO_HEADERS[Math.floor(Math.random() * INTRO_HEADERS.length)];
  
  // Randomly select one CTA
  const randomCTA = CALL_TO_ACTIONS[Math.floor(Math.random() * CALL_TO_ACTIONS.length)];
  
  // Adjust tone to match header voice
  let adjustedInsight = ikigaiInsight;
  try {
    const { adjustIkigaiTone, fallbackToneAdjustment } = require('./toneAdjuster.js');
    const toneResult = await adjustIkigaiTone(ikigaiInsight, randomHeader);
    adjustedInsight = toneResult.adjustedText;
  } catch (error) {
    console.warn('Tone adjustment failed, using fallback:', error);
    const { fallbackToneAdjustment } = require('./toneAdjuster.js');
    const fallbackResult = fallbackToneAdjustment(ikigaiInsight, randomHeader);
    adjustedInsight = fallbackResult.adjustedText;
  }
  
  // Remove quotation marks and optionally italicize the ikigai statement
  const cleanInsight = adjustedInsight
    .replace(/^["']|["']$/g, '') // Remove leading/trailing quotes
    .replace(/["']/g, ''); // Remove any remaining quotes within the text
  
  // Italicize the ikigai statement for visual emphasis
  const italicizedInsight = `*${cleanInsight}*`;
  
  // Format the post with proper spacing
  const post = `${randomHeader}

${italicizedInsight}

${randomCTA}`;

  return post;
};

const getRandomHeader = () => {
  return INTRO_HEADERS[Math.floor(Math.random() * INTRO_HEADERS.length)];
};

const getRandomCTA = () => {
  return CALL_TO_ACTIONS[Math.floor(Math.random() * CALL_TO_ACTIONS.length)];
};

// For testing purposes
const INTRO_HEADERS_EXPORT = INTRO_HEADERS;
const CALL_TO_ACTIONS_EXPORT = CALL_TO_ACTIONS;

// CommonJS exports
module.exports = {
  generateLinkedInPost,
  getRandomHeader,
  getRandomCTA,
  INTRO_HEADERS_EXPORT,
  CALL_TO_ACTIONS_EXPORT
}; 