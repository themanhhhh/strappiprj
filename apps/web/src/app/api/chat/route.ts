import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn của công ty thi công nội thất nhà hàng chuyên nghiệp, phong cách Industrial Minimal. 
Nhiệm vụ của bạn là hỗ trợ khách hàng tìm hiểu về:
- Các dịch vụ thi công (thiết kế, thi công nội thất, fit-out nhà hàng, quán café, bar...)
- Quy trình làm việc, tiến độ dự án
- Báo giá sơ bộ và tư vấn ngân sách
- Các dự án tiêu biểu đã thực hiện
- Thông tin liên hệ, đặt lịch khảo sát

Hãy trả lời ngắn gọn, chuyên nghiệp, thân thiện bằng tiếng Việt. 
Nếu khách hàng hỏi về báo giá cụ thể, hãy mời họ để lại thông tin để được tư vấn chi tiết.
Khuyến khích khách hàng đặt lịch khảo sát miễn phí.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    console.error('[chat/route]', err);
    return new Response(JSON.stringify({ error: 'Không thể kết nối AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
