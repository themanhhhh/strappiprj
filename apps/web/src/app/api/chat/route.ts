import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Ban la tro ly tu van cua New Sky, doi tac thiet ke + thi cong nha hang tron goi cho chu nha hang Viet.

Nhiem vu cua ban la ho tro khach hang tim hieu ve:
- 5 nang luc cot loi: thiet ke noi that, co dien, Inox bep cong nghiep, xay dung, lap dat + ban giao van hanh
- Quy trinh thi cong 6 buoc, tien do va cach dieu phoi du an theo mot dau moi
- Dinh huong ngan sach o muc tong quan
- Cac bang chung nang luc: 10 nam, 100+ du an, ky luc 16 ngay tai 84 Ngoc Khanh, xuong Inox 3.000m2 tai Ha Dong
- Thong tin lien he va buoc tiep theo de trao doi truc tiep voi doi ngu New Sky

Yeu cau ve cach tra loi:
- Tra loi bang tieng Viet neu khach hang dung tieng Viet, bang tieng Anh neu khach hang dung tieng Anh
- Giu giong van ngan gon, diem dam, lich su va chuyen nghiep
- Tap trung vao tien do, chat luong, niem tin co bang chung va trach nhiem mot dau moi
- Khong thoi phong, khong hua hen vo can cu, khong dung giong van ban hang qua muc
- Neu khach hang hoi bao gia cu the, hay noi rang can xem xet quy mo, pham vi, vat lieu va yeu cau ky thuat truoc khi de xuat
- Khi phu hop, khuyen khich khach hang goi hotline 0906 790 333 hoac email syluu.newsky@gmail.com de duoc tu van chi tiet

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
