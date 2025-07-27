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

const generateLinkedInPost = (ikigaiInsight: string): string => {
  // Randomly select one intro header
  const randomHeader = INTRO_HEADERS[Math.floor(Math.random() * INTRO_HEADERS.length)];
  
  // Randomly select one CTA
  const randomCTA = CALL_TO_ACTIONS[Math.floor(Math.random() * CALL_TO_ACTIONS.length)];
  
  // Format the post with proper spacing
  const post = `${randomHeader}

${ikigaiInsight}

${randomCTA}`;

  return post;
};

const getRandomHeader = (): string => {
  return INTRO_HEADERS[Math.floor(Math.random() * INTRO_HEADERS.length)];
};

const getRandomCTA = (): string => {
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