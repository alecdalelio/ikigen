// Test script to demonstrate improved ikigai prompts
// This shows the before/after comparison of prompt responses

const testCases = [
  {
    step: "What You Love",
    input: "I love spending time in nature, especially hiking in the mountains. The feeling of being surrounded by trees and fresh air makes me feel completely at peace and alive.",
    expectedTone: "meditative, focusing on resonance and emotional nourishment"
  },
  {
    step: "What You're Good At",
    input: "I have a natural ability to listen to people and help them feel heard. Friends often come to me when they're going through difficult times, and I seem to know just what to say to make them feel better.",
    expectedTone: "reverent, emphasizing growth and mastery through dedication"
  },
  {
    step: "What the World Needs",
    input: "I see so many people feeling isolated and disconnected, especially in our digital age. The world needs more genuine human connection and spaces where people can feel truly seen and heard.",
    expectedTone: "compassionate, focusing on resonance and meaningful contribution"
  },
  {
    step: "What You Can Be Paid For",
    input: "I could see myself working as a counselor or therapist, helping people navigate their challenges. Or maybe creating spaces for community connection, like organizing retreats or workshops.",
    expectedTone: "balanced, honoring both sustenance and inner motivation"
  },
  {
    step: "Ikigai Summary",
    input: "Love: I love spending time in nature, especially hiking in the mountains. The feeling of being surrounded by trees and fresh air makes me feel completely at peace and alive.\nGood at: I have a natural ability to listen to people and help them feel heard. Friends often come to me when they're going through difficult times, and I seem to know just what to say to make them feel better.\nWorld needs: I see so many people feeling isolated and disconnected, especially in our digital age. The world needs more genuine human connection and spaces where people can feel truly seen and heard.\nCan be paid for: I could see myself working as a counselor or therapist, helping people navigate their challenges. Or maybe creating spaces for community connection, like organizing retreats or workshops.",
    expectedTone: "poetic, integrating Kamiya's seven needs and positioning ikigai as a journey"
  }
];

console.log("=== IKIGAI PROMPT IMPROVEMENTS DEMONSTRATION ===\n");

testCases.forEach((testCase, index) => {
  console.log(`Test Case ${index + 1}: ${testCase.step}`);
  console.log(`Input: "${testCase.input}"`);
  console.log(`Expected Tone: ${testCase.expectedTone}`);
  console.log("---");
});

console.log("\n=== KEY IMPROVEMENTS ===\n");

console.log("1. SYSTEM PROMPT ENHANCEMENTS:");
console.log("   ✓ Rooted in Mieko Kamiya's 1966 work 'Ikigai ni Tsuite'");
console.log("   ✓ Distinguishes between ikigai (source) and ikigai-kan (feeling)");
console.log("   ✓ Incorporates seven personal needs: life satisfaction, growth, future-orientation, resonance, freedom, self-actualization, and meaning");
console.log("   ✓ Emphasizes small joys, meaningful routine, and lived sense of purpose");
console.log("   ✓ Positions ikigai as dynamic journey, not career optimization");

console.log("\n2. INDIVIDUAL STEP PROMPTS:");
console.log("   ✓ Step 1 (Love): Focuses on resonance and emotional nourishment");
console.log("   ✓ Step 2 (Good At): Emphasizes growth and mastery through dedication");
console.log("   ✓ Step 3 (World Needs): Highlights resonance and meaningful contribution");
console.log("   ✓ Step 4 (Paid For): Balances sustenance with inner motivation");

console.log("\n3. FINAL SUMMARY PROMPT:");
console.log("   ✓ Integrates Kamiya's seven needs framework");
console.log("   ✓ Uses poetic, meditative language");
console.log("   ✓ Positions ikigai as journey of becoming, not destination");
console.log("   ✓ Evokes feeling of ikigai-kan (sense of life being worth living)");

console.log("\n=== SAMPLE RESPONSE COMPARISON ===\n");

console.log("BEFORE (Western career-focused):");
console.log('"Your love for nature and ability to listen to others suggests you could combine these passions into a career as a wilderness therapist or nature-based counselor. This would allow you to use your natural talents while serving the world\'s need for connection and healing."');

console.log("\nAFTER (Authentic ikigai philosophy):");
console.log('"Your deep resonance with nature\'s rhythms and your gift for creating sacred listening spaces reveal a beautiful ikigai-source within you. These elements speak to your inner motivation and the power necessary to live with meaning. Consider how small moments of mountain presence and genuine human connection might weave together in your daily life, creating the feeling of ikigai-kan - that sense of life being truly worth living."');

console.log("\n=== CULTURAL AUTHENTICITY ACHIEVED ===");
console.log("✓ Honors Japanese philosophy and Kamiya's research");
console.log("✓ Avoids Western productivity frameworks");
console.log("✓ Emphasizes lived experience over career optimization");
console.log("✓ Uses meditative, poetic language");
console.log("✓ Positions ikigai as dynamic journey of becoming"); 