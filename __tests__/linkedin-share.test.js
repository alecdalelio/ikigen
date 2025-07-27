const { 
  generateLinkedInPost, 
  getRandomHeader, 
  getRandomCTA,
  INTRO_HEADERS_EXPORT,
  CALL_TO_ACTIONS_EXPORT 
} = require('../app/utils/linkedinShare.js');

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

// Mock window.open
global.window = {
  ...global.window,
  open: jest.fn(),
};

describe('LinkedIn Share Utils', () => {
  describe('getRandomHeader', () => {
    it('should return one of the defined headers', () => {
      const header = getRandomHeader();
      expect(INTRO_HEADERS_EXPORT).toContain(header);
    });

    it('should return different headers on multiple calls', () => {
      const headers = new Set();
      for (let i = 0; i < 10; i++) {
        headers.add(getRandomHeader());
      }
      // Should have at least 2 different headers (randomness)
      expect(headers.size).toBeGreaterThan(1);
    });
  });

  describe('getRandomCTA', () => {
    it('should return one of the defined CTAs', () => {
      const cta = getRandomCTA();
      expect(CALL_TO_ACTIONS_EXPORT).toContain(cta);
    });

    it('should return different CTAs on multiple calls', () => {
      const ctas = new Set();
      for (let i = 0; i < 10; i++) {
        ctas.add(getRandomCTA());
      }
      // Should have at least 2 different CTAs (randomness)
      expect(ctas.size).toBeGreaterThan(1);
    });
  });

  describe('generateLinkedInPost', () => {
    it('should include the Ikigai insight in the generated post', async () => {
      const testInsight = "Your ikigai is to help communities rediscover wonder through collective storytelling and play.";
      const post = await generateLinkedInPost(testInsight);
      expect(post).toContain(testInsight);
    });

    it('should include a header from the defined list', async () => {
      const testInsight = "Your ikigai is to create meaningful connections.";
      const post = await generateLinkedInPost(testInsight);
      const hasValidHeader = INTRO_HEADERS_EXPORT.some(header => post.includes(header));
      expect(hasValidHeader).toBe(true);
    });

    it('should include a CTA from the defined list', async () => {
      const testInsight = "Your ikigai is to inspire others.";
      const post = await generateLinkedInPost(testInsight);
      const hasValidCTA = CALL_TO_ACTIONS_EXPORT.some(cta => post.includes(cta));
      expect(hasValidCTA).toBe(true);
    });

    it('should format the post with proper spacing', async () => {
      const testInsight = "Your ikigai is to bring joy to others.";
      const post = await generateLinkedInPost(testInsight);
      
      // Should have the correct structure: header + blank line + insight + blank line + CTA
      const lines = post.split('\n');
      expect(lines.length).toBeGreaterThanOrEqual(4); // At least 4 lines
      
      // First line should be a header
      const hasHeader = INTRO_HEADERS_EXPORT.some(header => lines[0] === header);
      expect(hasHeader).toBe(true);
      
      // Should contain the insight
      expect(post).toContain(testInsight);
      
      // Last line should be a CTA
      const hasCTA = CALL_TO_ACTIONS_EXPORT.some(cta => lines[lines.length - 1] === cta);
      expect(hasCTA).toBe(true);
    });

    it('should generate different posts for the same insight', async () => {
      const testInsight = "Your ikigai is to make a difference.";
      const post1 = await generateLinkedInPost(testInsight);
      const post2 = await generateLinkedInPost(testInsight);
      
      // Posts should be different due to random header/CTA selection
      expect(post1).not.toBe(post2);
    });

    it('should handle empty or undefined insight gracefully', async () => {
      const post = await generateLinkedInPost("");
      expect(post).toContain("");
      expect(post).toMatch(/^[✨💡🧘‍♀️🎨🪷].*/); // Should start with an emoji header
    });
  });

  describe('Constants', () => {
    it('should have the correct number of intro headers', () => {
      expect(INTRO_HEADERS_EXPORT).toHaveLength(5);
    });

    it('should have the correct number of CTAs', () => {
      expect(CALL_TO_ACTIONS_EXPORT).toHaveLength(5);
    });

    it('should have valid intro headers', () => {
      INTRO_HEADERS_EXPORT.forEach(header => {
        expect(header).toMatch(/^[✨💡🧘‍♀️🎨🪷].*/); // Should start with an emoji
        expect(header.length).toBeGreaterThan(0);
      });
    });

    it('should have valid CTAs with URLs', () => {
      CALL_TO_ACTIONS_EXPORT.forEach(cta => {
        expect(cta).toContain('https://ikigen.vercel.app');
        expect(cta).toMatch(/^[👉🎯✨🧭🪞].*/); // Should start with an emoji
      });
    });
  });
});

describe('LinkedIn Share Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a complete LinkedIn post with all required elements', async () => {
    const testInsight = "Your ikigai is to help communities rediscover wonder through collective storytelling and play.";
    const post = await generateLinkedInPost(testInsight);
    
    // Check structure
    const lines = post.split('\n');
    expect(lines.length).toBeGreaterThanOrEqual(4);
    
    // Check content
    expect(post).toContain(testInsight);
    expect(INTRO_HEADERS_EXPORT.some(header => post.includes(header))).toBe(true);
    expect(CALL_TO_ACTIONS_EXPORT.some(cta => post.includes(cta))).toBe(true);
    
    // Check formatting (should have blank lines between sections)
    expect(post).toMatch(/\n\n/); // Should have double line breaks
  });

  it('should produce posts that are suitable for LinkedIn sharing', async () => {
    const testInsight = "Your ikigai is to inspire creativity and innovation.";
    const post = await generateLinkedInPost(testInsight);
    
    // LinkedIn posts should be reasonably sized
    expect(post.length).toBeLessThan(3000); // LinkedIn character limit is 3000
    
    // Should contain the required elements
    expect(post).toContain(testInsight);
    expect(INTRO_HEADERS_EXPORT.some(header => post.includes(header))).toBe(true);
    expect(CALL_TO_ACTIONS_EXPORT.some(cta => post.includes(cta))).toBe(true);
  });
}); 