const { 
  adjustIkigaiTone, 
  fallbackToneAdjustment, 
  isFirstPersonHeaderExport 
} = require('../app/utils/toneAdjuster.js');

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Tone Adjustment Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFirstPersonHeader', () => {
    it('should identify first-person headers correctly', () => {
      const firstPersonHeaders = [
        "My Ikigai",
        "Why I Wake Up Each Day",
        "What drives me",
        "My purpose in life",
        "I am passionate about"
      ];

      firstPersonHeaders.forEach(header => {
        const result = isFirstPersonHeaderExport(header);
        console.log(`Header: "${header}" -> ${result}`);
        expect(result).toBe(true);
      });
    });

    it('should identify non-first-person headers correctly', () => {
      const nonFirstPersonHeaders = [
        "A Reflection on Meaning",
        "The Purpose of Life",
        "Finding Your Path",
        "Discovering Purpose"
      ];

      nonFirstPersonHeaders.forEach(header => {
        expect(isFirstPersonHeaderExport(header)).toBe(false);
      });
    });

    it('should handle edge cases', () => {
      expect(isFirstPersonHeaderExport("")).toBe(false);
      expect(isFirstPersonHeaderExport("MY IKIGAI")).toBe(true);
      expect(isFirstPersonHeaderExport("my ikigai")).toBe(true);
    });
  });

  describe('fallbackToneAdjustment', () => {
    it('should adjust first-person headers correctly', () => {
      const testCases = [
        {
          header: "My Purpose",
          input: "Your melodies weave threads of empathy and sound into a healing symphony.",
          expected: "My melodies weave threads of empathy and sound into a healing symphony."
        },
        {
          header: "Why I Wake Up Each Day",
          input: "Your ikigai is to help communities rediscover wonder through collective storytelling and play.",
          expected: "My ikigai is to help communities rediscover wonder through collective storytelling and play."
        },
        {
          header: "What drives me",
          input: "You are a bridge between technology and human connection.",
          expected: "I am a bridge between technology and human connection."
        }
      ];

      testCases.forEach(({ header, input, expected }) => {
        const result = fallbackToneAdjustment(input, header);
        expect(result.adjustedText).toBe(expected);
        expect(result.wasAdjusted).toBe(true);
      });
    });

    it('should not adjust non-first-person headers', () => {
      const testCases = [
        {
          header: "A Reflection on Meaning",
          input: "Your melodies weave threads of empathy and sound into a healing symphony.",
          expected: "Your melodies weave threads of empathy and sound into a healing symphony."
        },
        {
          header: "The Purpose of Life",
          input: "Your ikigai is to inspire others.",
          expected: "Your ikigai is to inspire others."
        }
      ];

      testCases.forEach(({ header, input, expected }) => {
        const result = fallbackToneAdjustment(input, header);
        expect(result.adjustedText).toBe(expected);
        expect(result.wasAdjusted).toBe(false);
      });
    });

    it('should handle edge cases gracefully', () => {
      const result = fallbackToneAdjustment("", "My Header");
      expect(result.adjustedText).toBe("");
      expect(result.wasAdjusted).toBe(false);
    });
  });

  describe('adjustIkigaiTone', () => {
    it('should use LLM for first-person headers when API is available', async () => {
      const mockResponse = {
        adjustedText: "My melodies weave threads of empathy and sound into a healing symphony.",
        wasAdjusted: true
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await adjustIkigaiTone(
        "Your melodies weave threads of empathy and sound into a healing symphony.",
        "My Purpose"
      );

      expect(result.adjustedText).toBe(mockResponse.adjustedText);
      expect(result.wasAdjusted).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith('/api/tone-adjust', expect.any(Object));
    });

    it('should not adjust non-first-person headers', async () => {
      const result = await adjustIkigaiTone(
        "Your melodies weave threads of empathy and sound into a healing symphony.",
        "A Reflection on Meaning"
      );

      expect(result.adjustedText).toBe("Your melodies weave threads of empathy and sound into a healing symphony.");
      expect(result.wasAdjusted).toBe(false);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should fallback gracefully when API fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false
      });

      const result = await adjustIkigaiTone(
        "Your ikigai is to help communities rediscover wonder.",
        "My Purpose"
      );

      expect(result.adjustedText).toBe("Your ikigai is to help communities rediscover wonder.");
      expect(result.wasAdjusted).toBe(false);
    });

    it('should handle network errors gracefully', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await adjustIkigaiTone(
        "Your ikigai is to inspire others.",
        "My Purpose"
      );

      expect(result.adjustedText).toBe("Your ikigai is to inspire others.");
      expect(result.wasAdjusted).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('should maintain poetic quality in adjustments', () => {
      const poeticInput = "Your melodies weave threads of empathy and sound into a healing symphony.";
      const result = fallbackToneAdjustment(poeticInput, "My Purpose");
      
      expect(result.adjustedText).toContain("My melodies");
      expect(result.adjustedText).toContain("healing symphony");
      expect(result.adjustedText).toContain("empathy");
    });

    it('should handle complex sentences', () => {
      const complexInput = "Your ability to listen and your passion for helping others create a unique combination that serves the world's need for connection.";
      const result = fallbackToneAdjustment(complexInput, "My Purpose");
      
      expect(result.adjustedText).toContain("My ability");
      expect(result.adjustedText).toContain("my passion");
      expect(result.adjustedText).toContain("create"); // Check for preserved content
    });

    it('should preserve metaphors and imagery', () => {
      const metaphoricalInput = "Your words are like seeds that grow into gardens of understanding in the hearts of others.";
      const result = fallbackToneAdjustment(metaphoricalInput, "My Purpose");
      
      expect(result.adjustedText).toContain("My words");
      expect(result.adjustedText).toContain("seeds");
      expect(result.adjustedText).toContain("gardens");
      expect(result.adjustedText).toContain("hearts");
    });
  });
});

describe('Tone Adjustment Edge Cases', () => {
  it('should handle empty strings gracefully', () => {
    const result = fallbackToneAdjustment("", "My Header");
    expect(result.adjustedText).toBe("");
    expect(result.wasAdjusted).toBe(false);
  });

  it('should handle strings without pronouns', () => {
    const result = fallbackToneAdjustment("This is a test sentence.", "My Header");
    expect(result.adjustedText).toBe("This is a test sentence.");
    expect(result.wasAdjusted).toBe(false);
  });

  it('should handle mixed case pronouns', () => {
    const result = fallbackToneAdjustment("Your journey and YOUR path are unique.", "My Header");
    expect(result.adjustedText).toBe("My journey and MY path are unique.");
  });

  it('should not replace pronouns in the middle of words', () => {
    const result = fallbackToneAdjustment("Your journey through yourstory continues.", "My Header");
    expect(result.adjustedText).toBe("My journey through yourstory continues.");
  });
}); 