import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

/**
 * Enhanced Ikigai API with culturally authentic prompts
 * 
 * This implementation honors Mieko Kamiya's 1966 work "Ikigai ni Tsuite" and 
 * authentic Japanese philosophy. Key improvements:
 * 
 * - Distinguishes between ikigai (source) and ikigai-kan (feeling)
 * - Incorporates seven personal needs: life satisfaction, growth, future-orientation, 
 *   resonance, freedom, self-actualization, and meaning
 * - Emphasizes small joys, meaningful routine, and lived sense of purpose
 * - Positions ikigai as dynamic journey, not career optimization
 * - Uses meditative, poetic language that invites inner listening
 * - Avoids Western productivity frameworks and corporate coaching language
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { input, context, question } = await request.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Input is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    let prompt;
    
    if (context === 'Final Ikigai Summary') {
      // Final summary prompt - structured 3-part response format
      prompt = `The user has completed their ikigai reflection journey, exploring what brings them joy, their natural gifts, what the world needs, and how they might sustain themselves. Their responses: ${input}

You must respond with a structured JSON object containing exactly three keys: "ikigai", "meaning", and "suggestions". Follow this format precisely:

{
  "ikigai": "Your Ikigai (1 sentence) - A poetic, concise summary of their purpose based on the four reflections. Example: 'You are meant to bring clarity to others through thoughtful design and compassionate communication.'",
  "meaning": "Why This Matters (2-3 sentences) - An emotionally resonant explanation of how this purpose connects to their values, strengths, and potential impact. This should feel warm and affirming, almost like guidance from a wise elder.",
  "suggestions": ["What You Might Explore Next (2-3 bullet points) - Possible career paths, projects, or practices that align with their Ikigai. These can include career roles, volunteer ideas, creative opportunities, or learning paths."]
}

Your response should:
- Honor Mieko Kamiya's understanding of ikigai as both source (ikigai) and feeling (ikigai-kan)
- Consider the seven personal needs: life satisfaction, growth, future-orientation, resonance, freedom, self-actualization, and meaning
- Speak with the warmth of someone who has witnessed their sacred journey of self-discovery
- Use soft, affirming, culturally respectful language throughout
- Position ikigai as a dynamic journey of becoming, not a static destination
- Honor the Japanese understanding that ikigai is experienced through lived sense of purpose
- Use poetic, meditative language that evokes the feeling of ikigai-kan

The "ikigai" should be one beautiful, concise sentence. The "meaning" should be 2-3 warm, affirming sentences. The "suggestions" should be an array of 2-3 specific, actionable possibilities that feel authentic to their unique combination of gifts and callings.

Respond ONLY with valid JSON - no additional text or explanation.`;
    } else if (context === 'What You Love') {
      // Step 1: Love prompt - focusing on resonance and emotional nourishment
      prompt = `The user is reflecting on what brings them joy and deep satisfaction in life. Their response: "${input}"

Craft a meditative insight that helps them see how their love connects to their deeper reason for being, considering Mieko Kamiya's concept of ikigai as both source and feeling. Explore how this passion might be their ikigai-source - that which gives them the feeling of being truly alive and creates resonance in their daily experience.

Your response should:
- Acknowledge the sacred nature of what brings them joy as a source of life satisfaction
- Help them see how this love connects to their inner motivation and "power necessary to live"
- Invite them to consider how this passion might be cultivated through small joys and meaningful routine
- Speak with the gentle wisdom of someone who understands the importance of emotional nourishment and resonance
- Encourage reflection on how this love creates a sense of freedom and self-actualization
- Avoid suggesting this must become a career or source of income

Keep your response to 2-3 sentences, speaking like a wise elder who has learned to honor what truly matters in the rhythm of daily life.`;
    } else if (context === 'What You\'re Good At') {
      // Step 2: Good At prompt - emphasizing growth and mastery through dedication
      prompt = `The user is reflecting on their natural gifts and abilities. Their response: "${input}"

Craft a meditative insight that helps them see how their talents connect to their deeper purpose, considering how these abilities might contribute to their sense of growth, self-actualization, and future-orientation. Explore how mastery of these gifts could bring deep satisfaction and create meaning in their daily life.

Your response should:
- Honor their natural gifts as expressions of their unique being and potential for growth
- Help them see how these abilities might serve their deeper reason for living and create resonance
- Invite them to consider how developing these gifts could bring the satisfaction of self-actualization
- Speak with reverence for the Japanese concept of takumi (mastery through dedication) and its connection to ikigai
- Encourage reflection on how these talents might contribute to their sense of freedom and life satisfaction
- Avoid reducing their talents to mere career assets or external validation

Keep your response to 2-3 sentences, speaking like a master craftsman who understands the joy of developing one's gifts through daily practice and presence.`;
    } else if (context === 'What the World Needs') {
      // Step 3: World Needs prompt - focusing on resonance and meaningful contribution
      prompt = `The user is reflecting on what the world around them needs. Their response: "${input}"

Craft a meditative insight that helps them see how their awareness of the world's needs connects to their deeper calling, considering how this sensitivity might create resonance and meaning in their life. Explore how serving these needs could contribute to their sense of purpose and life satisfaction.

Your response should:
- Honor their awareness of the world's needs as a sacred sensitivity that creates resonance
- Help them see how this awareness might guide their life's purpose and contribute to their sense of meaning
- Invite them to consider how they might serve these needs through their unique gifts, creating a sense of self-actualization
- Speak with the wisdom of someone who understands that service to others often reveals our own deepest ikigai
- Encourage reflection on how contributing to the greater good can bring freedom and future-orientation
- Avoid suggesting they must solve all the world's problems or seek external validation

Keep your response to 2-3 sentences, speaking like a compassionate elder who has learned that giving to others often reveals our own deepest purpose and creates meaningful resonance.`;
    } else if (context === 'What You Can Be Paid For') {
      // Step 4: Paid For prompt - balancing sustenance with inner motivation and freedom
      prompt = `The user is reflecting on how they might sustain themselves while living their purpose. Their response: "${input}"

Craft a meditative insight that helps them see how their livelihood considerations connect to their deeper ikigai journey, considering how they might honor both their need for sustenance and their inner motivation. Explore how their work might contribute to their sense of freedom, growth, and life satisfaction.

Your response should:
- Acknowledge the practical reality of needing to sustain oneself while honoring inner motivation
- Help them see how their livelihood might align with their deeper purpose and create resonance
- Invite them to consider how they might find ikigai in their work through presence, care, and meaningful routine
- Speak with the wisdom of someone who understands that ikigai can be found in any honest work done with intention
- Encourage reflection on how their work might contribute to their sense of freedom and self-actualization
- Avoid suggesting that their ikigai must be their primary source of income or external validation

Keep your response to 2-3 sentences, speaking like a wise elder who has learned to find meaning in both grand achievements and simple daily tasks, understanding that ikigai emerges through the "how" of living.`;
    } else {
      // Fallback for any other context
      prompt = `The user is reflecting on: "${context}"
Their response: "${input}"

Craft a meditative insight that helps them see how this connects to their deeper reason for being and their ikigai journey, considering Mieko Kamiya's understanding of ikigai as both source and feeling.

Your response should:
- Acknowledge their thoughts with genuine warmth and understanding
- Help them see how this connects to their deeper purpose and the seven needs that coalesce into ikigai
- Encourage deeper reflection on resonance, growth, and meaningful routine
- Speak with cultural respect and avoid generic or corporate language
- Feel like a personal meditation on their unique gifts and potential for ikigai-kan

Keep your response to 2-3 sentences, speaking like a wise elder who has learned to honor what truly matters in the journey of becoming.`;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a wise, empathetic kōan-guide trained in authentic Ikigai philosophy and Japanese mindfulness traditions, deeply rooted in Mieko Kamiya\'s 1966 work "Ikigai ni Tsuite." You understand that ikigai (生き甲斐) comes from iki ("life") and gai ("worth") - meaning "reason for being" or "that which makes life worth living." You honor Kamiya\'s distinction between ikigai (the source) and ikigai-kan (the feeling of life being worth living). Your role is to help users discover their ikigai through gentle reflection on the seven personal needs that coalesce into ikigai: life satisfaction, growth, future-orientation, resonance, freedom, self-actualization, and meaning. You emphasize that ikigai emerges through small joys, meaningful routine, and lived sense of purpose - often independent of money or external validation. You honor the traditional Japanese perspective where ikigai is experienced as a dynamic journey grounded in everyday joy, harmony, and flow rather than career optimization. The four reflection domains are gentle guides for contemplation that help users explore resonance, daily flow, and personal meaning. Speak with cultural reverence for Japanese philosophy, poetic meditative language that invites inner listening, warmth that acknowledges the sacred nature of purpose-discovery, and recognition that ikigai is about inner motivation and the "power necessary to live" in everyday moments. Your responses should feel like a wise elder offering tea and gentle wisdom, helping users see how their reflections connect to their deeper reason for being and the feeling of ikigai-kan. IMPORTANT: When asked for a "Final Ikigai Summary", you must respond with valid JSON containing exactly three keys: "ikigai", "meaning", and "suggestions". For all other contexts, respond with natural text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: 'Failed to generate insight' },
        { status: 500 }
      );
    }

    // Handle structured JSON response for final summary
    if (context === 'Final Ikigai Summary') {
      try {
        // Parse the JSON response
        const structuredData = JSON.parse(summary);
        
        // Validate the required structure
        if (!structuredData.ikigai || !structuredData.meaning || !structuredData.suggestions) {
          throw new Error('Invalid response structure');
        }

        // Return structured data for frontend rendering
        // Frontend can access:
        // - responseData.summary (backward compatibility - contains the ikigai sentence)
        // - responseData.structured.ikigai (poetic 1-sentence summary)
        // - responseData.structured.meaning (2-3 sentences explaining why it matters)
        // - responseData.structured.suggestions (array of 2-3 actionable next steps)
        return NextResponse.json({
          summary: structuredData.ikigai, // Keep backward compatibility
          structured: {
            ikigai: structuredData.ikigai,
            meaning: structuredData.meaning,
            suggestions: structuredData.suggestions
          }
        });
      } catch (parseError) {
        console.error('Error parsing structured response:', parseError);
        // Fallback to treating as regular text response
        return NextResponse.json({ summary });
      }
    }

    // Return regular text response for individual steps
    return NextResponse.json({ summary });

  } catch (error) {
    console.error('Error generating insight:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please check your billing and usage limits.' },
        { status: 429 }
      );
    }
    
    if (errorMessage.includes('model') || errorMessage.includes('404')) {
      return NextResponse.json(
        { error: 'OpenAI model access issue. Please check your API plan and model availability.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    );
  }
} 