import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();

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

    const prompt = `You are a thoughtful reflection assistant helping someone uncover their Ikigai - their reason for being. 

The user has shared what they love doing: "${input}"

Please provide a warm, insightful response that:
- Acknowledges their passion and enthusiasm
- Helps them see how this activity connects to their deeper purpose
- Suggests how it might relate to their Ikigai (the intersection of what they love, what they're good at, what the world needs, and what they can be paid for)
- Encourages further reflection
- Keeps the tone supportive and encouraging, like a wise mentor

Keep your response to 2-3 sentences maximum. Make it feel personal and meaningful.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a warm, insightful Ikigai coach who helps people discover their life purpose through thoughtful reflection.'
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