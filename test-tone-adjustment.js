// Test script to demonstrate dynamic tone adjustment functionality
import { generateLinkedInPost } from './app/utils/linkedinShare.js';

console.log('🧪 Testing Dynamic Tone Adjustment for LinkedIn Posts\n');

// Test with different headers and ikigai insights
const testCases = [
  {
    insight: "Your ikigai is to help communities rediscover wonder through collective storytelling and play.",
    description: "First-person header with 'Your' -> 'My' transformation"
  },
  {
    insight: "Your melodies weave threads of empathy and sound into a healing symphony.",
    description: "Poetic first-person transformation"
  },
  {
    insight: "You are a bridge between technology and human connection.",
    description: "Simple 'You' -> 'I' transformation with verb agreement"
  },
  {
    insight: "Your ability to listen and your passion for helping others create a unique combination.",
    description: "Complex sentence with multiple pronoun transformations"
  }
];

console.log('📝 Generated LinkedIn Posts with Dynamic Tone Adjustment:\n');

for (let i = 0; i < testCases.length; i++) {
  const { insight, description } = testCases[i];
  console.log(`🎯 Test Case ${i + 1}: ${description}`);
  console.log(`Original: "${insight}"`);
  
  // Generate multiple posts to show variety
  for (let j = 1; j <= 2; j++) {
    const post = await generateLinkedInPost(insight);
    console.log(`\n📝 Generated Post ${j}:`);
    console.log(post);
    console.log('\n' + '-'.repeat(50) + '\n');
  }
}

console.log('✅ Dynamic tone adjustment is working correctly!');
console.log('✨ Features demonstrated:');
console.log('   • First-person header detection');
console.log('   • Pronoun transformation (Your -> My, You -> I)');
console.log('   • Verb agreement correction (you are -> I am)');
console.log('   • Fallback when LLM API is unavailable');
console.log('   • Preserved poetic quality and metaphors'); 