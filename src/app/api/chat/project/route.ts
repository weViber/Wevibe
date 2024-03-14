import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  let conversationHistory: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        "You are an outstanding web app designer. Answer customer questions related to web apps in an easy-to-understand manner. If a customer asks something unrelated to web apps, respond as if you don't have information on that topic. Please respond in Korean.",
    },
  ];
  conversationHistory = conversationHistory.concat(messages); 

  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: conversationHistory,
    temperature: 0.7,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
