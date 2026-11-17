"use client";

import { useState, useEffect } from "react";
import type { Session } from "@/types";

interface Message {
  id?: number;
  role: string;
  content: string;
  display_kind?: string;
  display_content?: string;
}

export function ChatPanel({
  sessions, onSelect,
}: {
  sessions: Session[];
  onSelect: (id: string) => void;
}) {
  const [activeId, setActiveId] = useState<string>(sessions[0]?.id || "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (sessions[0]) setActiveId(sessions[0].id); }, [sessions]);

  useEffect(() => {
    if (!activeId) { setMessages([]); return; }
    let cancelled = false;
    setLoading(true);
    setError("");
    fetch(`/api/sessions/${activeId}/messages`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        setMessages(d.messages || []);
      })
      .catch(e => { if (!cancelled) setError("Gagal memuat pesan: " + String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [activeId]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <span className="card-title">Agent Chat</span>
          <div className="card-sub">Riwayat percakapan dari sesi Hermes · pilih sesi untuk melihat transkrip</div>
        </div>
        <select
          className="chat-input"
          style={{maxWidth: 320}}
          value={activeId}
          onChange={(e) => { setActiveId(e.target.value); onSelect(e.target.value); }}
        >
          <option value="">— pilih sesi —</option>
          {sessions.map(s => (
            <option key={s.id} value={s.id}>{s.title || s.id.slice(0, 24)}</option>
          ))}
        </select>
      </div>
      <div className="chat-window">
        <div className="chat-messages">
          {loading && <div className="chat-msg bot" style={{color:"var(--text-muted)"}}>Memuat transkrip...</div>}
          {error && <div className="chat-msg bot" style={{color:"var(--danger)"}}>{error}</div>}
          {!loading && !error && messages.length === 0 && (
            <div className="chat-msg bot" style={{color:"var(--text-muted)"}}>Belum ada pesan di sesi ini.</div>
          )}
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            const text = m.display_content || m.content || "";
            if (!text) return null;
            return (
              <div key={m.id ?? i} className={`chat-msg ${isUser ? "user" : "bot"}`}>{text}</div>
            );
          })}
        </div>
      </div>
      <div style={{marginTop: 16, padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, background: "rgba(124,154,255,0.06)", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12}}>
        <div>
          <strong style={{color:"var(--text)"}}>Chat streaming langsung</strong>
          <div style={{marginTop:4}}>Untuk mengirim pesan baru dengan streaming + tool activity, buka dashboard Hermes asli (WebSocket) melalui tunnel.</div>
        </div>
        <a className="primary-btn" href="/" target="_blank" rel="noreferrer" style={{whiteSpace:"nowrap"}}>Buka Chat Live</a>
      </div>
    </div>
  );
}
