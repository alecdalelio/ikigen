import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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
    
    if (context === 'Ikigai Summary') {
      // Final summary prompt
      prompt = `You are a wise Ikigai coach helping someone discover their life purpose. 

The user has completed their Ikigai reflection with these four areas:
${input}

Please provide a thoughtful, inspiring response that:
- Celebrates their completion of this reflection journey
- Helps them see how these four areas might intersect to form their Ikigai
- Offers guidance on how they might bring these elements together in their life
- Encourages them to take action based on these insights
- Keeps the tone warm, supportive, and empowering

Keep your response to 3-4 sentences maximum. Make it feel personal and actionable.`;
    } else {
      // Individual step prompt
      prompt = `You are a thoughtful reflection assistant helping someone uncover their Ikigai - their reason for being. 

The user is reflecting on: "${context}"
Their response: "${input}"

Please provide a warm, insightful response that:
- Acknowledges their thoughts and feelings
- Helps them see how this connects to their deeper purpose
- Suggests how it might relate to their Ikigai journey
- Encourages further reflection
- Keeps the tone supportive and encouraging, like a wise mentor

Keep your response to 2-3 sentences maximum. Make it feel personal and meaningful.`;
    }

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