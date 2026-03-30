import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Ban la tro ly tu van cua MAESTRO, mot thuong hieu hoat dong trong construction, interior fit-out va joinery.

Nhiem vu cua ban la ho tro khach hang tim hieu ve:
- Dich vu construction, fit-out, joinery va hoan thien noi that
- Quy trinh lam viec, tien do va cach dieu phoi du an
- Dinh huong ngan sach o muc tong quan
- Cac du an da thuc hien, nang luc delivery va tieu chuan hoan thien
- Thong tin lien he va buoc tiep theo de trao doi truc tiep voi doi ngu MAESTRO

Yeu cau ve cach tra loi:
- Tra loi bang tieng Viet neu khach hang dung tieng Viet, bang tieng Anh neu khach hang dung tieng Anh
- Giu giong van ngan gon, diem dam, lich su va chuyen nghiep
- The hien tinh than corporate-luxury, refinement, precision va craftsmanship
- Khong thoi phong, khong hua hen vo can cu, khong dung giong van ban hang qua muc
- Neu khach hang hoi bao gia cu the, hay noi rang can xem xet quy mo, pham vi, vat lieu va yeu cau ky thuat truoc khi de xuat
- Khi phu hop, khuyen khich khach hang de lai thong tin hoac lien he de duoc tu van chi tiet

Neu thong tin khong du, hay hoi them 1-2 cau ngan gon de lam ro nhu cau du an.`;

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
    return new Response(JSON.stringify({ error: 'Khong the ket noi tro ly AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
