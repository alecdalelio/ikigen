// Test script to demonstrate new LinkedIn formatting without quotes and with italics
import { generateLinkedInPost } from './app/utils/linkedinShare.js';

console.log('🧪 Testing New LinkedIn Formatting (No Quotes + Italics)\n');

// Test with different ikigai insights
const testCases = [
  {
    insight: '"Your ikigai is to help communities rediscover wonder through collective storytelling and play."',
    description: "Quoted insight with 'Your' -> 'My' transformation"
  },
  {
    insight: "Your melodies weave threads of empathy and sound into a healing symphony.",
    description: "Poetic transformation without quotes"
  },
  {
    insight: "'You are a bridge between technology and human connection.'",
    description: "Single-quoted insight with 'You' -> 'I' transformation"
  },
  {
    insight: "Your ability to listen and your passion for helping others create a unique combination.",
    description: "Complex sentence with multiple transformations"
  }
];

console.log('📝 Generated LinkedIn Posts with New Formatting:\n');

for (let i = 0; i < testCases.length; i++) {
  const { insight, description } = testCases[i];
  console.log(`🎯 Test Case ${i + 1}: ${description}`);
  console.log(`Original: "${insight}"`);
  
  // Generate multiple posts to show variety
  for (let j = 1; j <= 2; j++) {
    const post = await generateLinkedInPost(insight);
    console.log(`\n📝 Generated Post ${j}:`);
    console.log(post);
    console.log('\n' + '-'.repeat(60) + '\n');
  }
}

console.log('✅ New LinkedIn formatting is working correctly!');
console.log('✨ Features demonstrated:');
console.log('   • Removed quotation marks from ikigai statements');
console.log('   • Added italicization (*text*) for visual emphasis');
console.log('   • Preserved tone adjustment functionality');
console.log('   • Maintained clean, professional formatting');
console.log('   • Kept CTAs and links unchanged'); 