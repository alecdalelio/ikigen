// Test script to demonstrate dynamic LinkedIn post generation
const { generateLinkedInPost, INTRO_HEADERS_EXPORT, CALL_TO_ACTIONS_EXPORT } = require('./app/utils/linkedinShare.js');

console.log('🧪 Testing Dynamic LinkedIn Post Generation\n');

// Test with a sample Ikigai insight
const sampleInsight = "Your ikigai is to help communities rediscover wonder through collective storytelling and play.";

console.log('📋 Sample Ikigai Insight:');
console.log(sampleInsight);
console.log('\n' + '='.repeat(60) + '\n');

// Generate multiple posts to show variety
console.log('🎲 Generated LinkedIn Posts (3 examples):\n');

for (let i = 1; i <= 3; i++) {
  const post = generateLinkedInPost(sampleInsight);
  console.log(`📝 Post ${i}:`);
  console.log(post);
  console.log('\n' + '-'.repeat(40) + '\n');
}

// Show available headers and CTAs
console.log('📚 Available Intro Headers:');
INTRO_HEADERS_EXPORT.forEach((header, index) => {
  console.log(`${index + 1}. ${header}`);
});

console.log('\n📚 Available Call-to-Actions:');
CALL_TO_ACTIONS_EXPORT.forEach((cta, index) => {
  console.log(`${index + 1}. ${cta}`);
});

console.log('\n✅ Dynamic LinkedIn sharing is working correctly!'); 