'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatWidgetProps = {
  enabled?: boolean;
};

export function ChatWidget({ enabled = true }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Xin chao. Toi la tro ly tu van cua MAESTRO. Toi co the ho tro ban ve construction, interior fit-out, joinery, tien do thi cong va dinh huong giai phap phu hop voi du an cua ban.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Xin loi, he thong tam thoi gian doan. Vui long thu lai sau it phut hoac lien he truc tiep voi doi ngu MAESTRO de duoc ho tro nhanh hon.',
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = `Hôm nay ${timeStr}`;

  if (!enabled) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        className="cw-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Dong khung tro ly' : 'Mo tro ly tu van'}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="cw-window">
          {/* Header */}
          <div className="cw-header">
            <div className="cw-header-left">
              <div className="cw-bot-avatar-sm">
                <BotIcon size={18} />
              </div>
              <span className="cw-header-title">MAESTRO Assistant</span>
            </div>
            <button className="cw-close-btn" onClick={() => setOpen(false)} aria-label="Dong">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="cw-body">
            {/* Timestamp */}
            <div className="cw-timestamp">{dateStr}</div>

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`cw-msg cw-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="cw-bot-avatar">
                    <BotIcon size={16} />
                  </div>
                )}
                <div className="cw-bubble">
                  {msg.content || (
                    <span className="cw-typing">
                      <span /><span /><span />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Footer */}
          <div className="cw-footer">
            <div className="cw-input-row">
              <textarea
                ref={inputRef}
                className="cw-input"
                placeholder="Mo ta ngan gon nhu cau hoac quy mo du an cua ban..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
              <button
                className="cw-send"
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Gui"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="cw-disclaimer">
              Noi dung AI mang tinh tham khao ban dau. Voi phuong an, tien do va bao gia cu the, vui long xac nhan cung doi ngu MAESTRO.
            </p>
          </div>
        </div>
      )}

      <style>{`
        /* ── FAB ─────────────────────────── */
        .cw-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 1000;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--surface-dark, #1B1718);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .cw-fab:hover {
          transform: scale(1.07);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        /* ── Window ──────────────────────── */
        .cw-window {
          position: fixed;
          bottom: 96px;
          right: 28px;
          z-index: 999;
          width: 380px;
          height: 640px;
          max-height: calc(100vh - 140px);
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 1px 6px rgba(0,0,0,0.08);
          overflow: hidden;
          animation: cw-in 0.2s ease;
        }
        @keyframes cw-in {
          from { opacity:0; transform: translateY(10px) scale(0.98); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }

        /* ── Header ──────────────────────── */
        .cw-header {
          background: var(--surface-dark, #1B1718);
          color: #fff;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .cw-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cw-bot-avatar-sm {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-safety, #C1532F);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cw-header-title {
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
        }
        .cw-close-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .cw-close-btn:hover { color: #fff; }

        /* ── Body ────────────────────────── */
        .cw-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f7f7f7;
        }
        .cw-timestamp {
          text-align: center;
          font-size: 12px;
          color: #888;
          margin-bottom: 4px;
        }

        /* Notice box */
        .cw-notice {
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background: #fff;
          padding: 12px 14px;
          font-size: 12.5px;
          line-height: 1.5;
          color: #555;
        }
        .cw-notice-title {
          font-weight: 700;
          font-size: 12px;
          color: #333;
          margin: 0 0 4px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .cw-notice-text { margin: 0; }

        /* Messages */
        .cw-msg {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .cw-msg--user {
          flex-direction: row-reverse;
        }
        .cw-bot-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--accent-safety, #C1532F);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .cw-bubble {
          max-width: 78%;
          padding: 11px 14px;
          border-radius: 4px;
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .cw-msg--assistant .cw-bubble {
          background: #fff;
          color: #1B1718;
          border: 1px solid #e8e8e8;
          border-top-left-radius: 0;
          font-weight: 500;
        }
        .cw-msg--user .cw-bubble {
          background: var(--surface-dark, #1B1718);
          color: #fff;
          border-top-right-radius: 0;
        }

        /* Typing dots */
        .cw-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          height: 20px;
        }
        .cw-typing span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #aaa;
          animation: cw-bounce 1.2s infinite;
        }
        .cw-typing span:nth-child(2) { animation-delay: 0.2s; }
        .cw-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cw-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        /* ── Footer ──────────────────────── */
        .cw-footer {
          background: #fff;
          border-top: 1px solid #e8e8e8;
          padding: 12px 14px 10px;
          flex-shrink: 0;
        }
        .cw-input-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin-bottom: 8px;
        }
        .cw-input {
          flex: 1;
          resize: none;
          border: none;
          outline: none;
          font-size: 14px;
          background: transparent;
          color: #333;
          min-height: 24px;
          max-height: 90px;
          padding: 0;
          line-height: 1.5;
        }
        .cw-input::placeholder { color: #bbb; }
        .cw-send {
          background: none;
          border: none;
          cursor: pointer;
          color: #bbb;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .cw-send:not(:disabled):hover { color: var(--accent-safety, #C1532F); }
        .cw-send:disabled { opacity: 0.35; cursor: not-allowed; }
        .cw-disclaimer {
          font-size: 11px;
          color: #aaa;
          line-height: 1.4;
          margin: 0;
          border-top: 1px solid #f0f0f0;
          padding-top: 8px;
        }

        /* ── Responsive ──────────────────── */
        @media (max-width: 480px) {
          .cw-window { width: calc(100vw - 24px); right: 12px; bottom: 82px; }
          .cw-fab { right: 16px; bottom: 20px; }
        }
      `}</style>
    </>
  );
}

function BotIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M9 11V7a3 3 0 0 1 6 0v4" />
      <circle cx="9" cy="16" r="1" fill="#fff" stroke="none" />
      <circle cx="15" cy="16" r="1" fill="#fff" stroke="none" />
    </svg>
  );
}
