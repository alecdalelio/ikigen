const http = require('http');

// Test function to check if styles are applied
function testStyles() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/reflect/summary',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Check for debug element
        const hasDebugElement = data.includes('🚨 DEBUG: If you see this red box, Tailwind is working!');
        const hasInlineStyles = data.includes('style=');
        const hasTailwindClasses = data.includes('bg-black') && data.includes('text-white');
        const hasZincClasses = data.includes('bg-zinc-800');
        
        console.log('🔍 Style Test Results:');
        console.log('✅ Debug element present:', hasDebugElement);
        console.log('✅ Inline styles present:', hasInlineStyles);
        console.log('✅ Tailwind classes present:', hasTailwindClasses);
        console.log('✅ Zinc classes present:', hasZincClasses);
        
        if (hasDebugElement && hasInlineStyles) {
          console.log('🎉 Styles are being applied correctly!');
          resolve(true);
        } else {
          console.log('❌ Styles are not being applied correctly');
          resolve(false);
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ Test failed:', err.message);
      reject(err);
    });

    req.end();
  });
}

// Run the test
testStyles()
  .then((success) => {
    if (success) {
      console.log('✅ All tests passed!');
      process.exit(0);
    } else {
      console.log('❌ Tests failed!');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('❌ Test error:', err);
    process.exit(1);
  }); 