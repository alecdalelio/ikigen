// Test script for mobile detection functionality
const { isMobileDevice, isIOS, isAndroid } = require('./app/utils/mobileDetection.ts');

console.log('🧪 Testing Mobile Detection Functionality\n');

// Mock different user agents for testing
const testUserAgents = [
  {
    name: 'iPhone Safari',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
    expectedMobile: true,
    expectedIOS: true,
    expectedAndroid: false
  },
  {
    name: 'Android Chrome',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    expectedMobile: true,
    expectedIOS: false,
    expectedAndroid: true
  },
  {
    name: 'Desktop Chrome',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    expectedMobile: false,
    expectedIOS: false,
    expectedAndroid: false
  },
  {
    name: 'iPad Safari',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
    expectedMobile: true,
    expectedIOS: true,
    expectedAndroid: false
  }
];

console.log('📱 Testing Mobile Detection:\n');

testUserAgents.forEach((test, index) => {
  console.log(`Test ${index + 1}: ${test.name}`);
  console.log(`User Agent: ${test.userAgent.substring(0, 50)}...`);
  
  // Mock navigator.userAgent for testing
  Object.defineProperty(navigator, 'userAgent', {
    value: test.userAgent,
    configurable: true
  });
  
  const mobileResult = isMobileDevice();
  const iosResult = isIOS();
  const androidResult = isAndroid();
  
  console.log(`Mobile: ${mobileResult} (expected: ${test.expectedMobile})`);
  console.log(`iOS: ${iosResult} (expected: ${test.expectedIOS})`);
  console.log(`Android: ${androidResult} (expected: ${test.expectedAndroid})`);
  
  const allCorrect = mobileResult === test.expectedMobile && 
                    iosResult === test.expectedIOS && 
                    androidResult === test.expectedAndroid;
  
  console.log(`✅ ${allCorrect ? 'PASS' : 'FAIL'}\n`);
});

console.log('🎯 Mobile Detection Test Complete!');
console.log('✨ Features tested:');
console.log('   • Mobile device detection');
console.log('   • iOS device detection');
console.log('   • Android device detection');
console.log('   • Desktop device handling'); 