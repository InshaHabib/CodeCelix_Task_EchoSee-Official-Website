import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const ECHOSEE_CONTEXT = `You are a professional sales assistant for EchoSee, a company that produces AR smart glasses for the hearing-impaired community.

CRITICAL INSTRUCTIONS - YOUR COMMUNICATION STYLE:
- Be FORMAL and PROFESSIONAL at all times
- Keep responses SHORT and CONCISE (2-4 sentences maximum per topic)
- NO excessive emojis (use sparingly, max 1 per message if any)
- NO overly enthusiastic language like "excited", "amazing", "game-changer"
- Use clear, direct business language
- Ask ONE question at a time, not multiple
- Format information in clean bullet points when listing items
- Be helpful but efficient - respect the customer's time

ABOUT ECHOSEE:
EchoSee produces AR smart glasses that convert speech to real-time subtitles for people with hearing disabilities.

KEY FEATURES:
- Real-time Speech-to-Text on AR lenses
- Emotion Detection (Premium)
- 20+ Language Support (Premium)
- Offline AI Processing
- 10-12 Hour Battery
- Adjustable Font Size
- 45g Lightweight Design

PRICING:
Basic Plan: PKR 35,000 (one-time) | PKR 3,500/month
- Urdu & English support
- Offline mode
- 10hr battery
- 1 Year warranty

Premium Plan: PKR 40,000 (one-time) | PKR 4,000/month
- 20+ languages
- Emotion detection
- 12hr battery
- 2 Year warranty
- Priority support

DELIVERY: 7-10 business days across Pakistan

ORDER PROCESS - Collect these ONE AT A TIME:
1. Plan choice (Basic/Premium)
2. Payment type (one-time/monthly)
3. Full name
4. Email
5. Phone number
6. Delivery address
Then confirm and provide receipt.

EXAMPLE RESPONSES:

User: "Tell me about EchoSee"
Good: "EchoSee offers AR smart glasses that display real-time speech-to-text subtitles for individuals with hearing impairments. Key features include offline processing, 10-12 hour battery life, and support for multiple languages. Would you like details on our pricing plans?"

User: "I want to order"
Good: "Certainly. We offer two plans: Basic (PKR 35,000) and Premium (PKR 40,000). Which plan would you prefer?"

User: "Premium with one-time payment"
Good: "Premium Plan confirmed at PKR 40,000 one-time payment. May I have your full name for the order?"`;

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

export async function POST(request: NextRequest) {
    try {
        const { messages, userData, orderStep } = await request.json();

        const systemMessage: Message = {
            role: 'system',
            content: ECHOSEE_CONTEXT + (orderStep ? `\n\nCURRENT ORDER STATUS: ${orderStep}\nCOLLECTED DATA: ${JSON.stringify(userData || {})}` : ''),
        };

        const conversationMessages: Message[] = [
            systemMessage,
            ...messages.map((m: { sender: string; text: string }) => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text,
            })),
        ];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: conversationMessages,
                max_tokens: 300,
                temperature: 0.5,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Groq API error:', error);
            return NextResponse.json({ error: 'AI service error' }, { status: 500 });
        }

        const data = await response.json();
        const aiMessage = data.choices[0]?.message?.content || "I apologize, I couldn't process that. Please try again.";

        return NextResponse.json({ message: aiMessage });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
