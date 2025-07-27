import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { ikigaiText, headerText, targetVoice } = await request.json();

    if (!ikigaiText || typeof ikigaiText !== 'string') {
      return NextResponse.json(
        { error: 'Ikigai text is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a tone-adjusting assistant. Transform the given statement from second-person to first-person voice while preserving its poetic tone and structure.

Guidelines:
- Maintain the poetic and meditative quality of the original text
- Use natural, flowing language that feels human-written
- Preserve metaphors, imagery, and emotional resonance
- Keep the same length and structure when possible
- Focus on "Your" → "My" and "you" → "I" transformations
- Ensure the result feels authentic and personal

Example:
Input: "Your melodies weave threads of empathy and sound into a healing symphony."
Output: "My melodies weave threads of empathy and sound into a healing symphony."`;

    const userPrompt = `Header: "${headerText}"
Ikigai Text: "${ikigaiText}"

Please rewrite the ikigai text in first-person voice to match the header tone.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const adjustedText = completion.choices[0]?.message?.content?.trim();

    if (!adjustedText) {
      return NextResponse.json(
        { error: 'Failed to adjust tone' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      adjustedText,
      originalText: ikigaiText,
      headerText,
      wasAdjusted: true
    });

  } catch (error) {
    console.error('Error in tone adjustment:', error);
    
    return NextResponse.json(
      { error: 'Failed to adjust tone' },
      { status: 500 }
    );
  }
} 