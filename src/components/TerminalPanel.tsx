"use client";
import { useState } from "react";

export function TerminalPanel({ logs }: { logs: string[] }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("");
  const filtered = logs
    .filter(l => !q || l.toLowerCase().includes(q.toLowerCase()))
    .filter(l => {
      if (!level) return true;
      const up = l.toUpperCase();
      if (level === "error") return up.includes(" ERROR ") || up.includes("ERR ");
      if (level === "warn") return up.includes(" WARNING ") || up.includes("WARN ");
      if (level === "info") return up.includes(" INFO ");
      return true;
    });

  return (
    <div style={{display:"flex", flexDirection:"column", gap:16}}>
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">Hermes Execution Logs</span>
            <div className="card-sub">Read-only · agent.log</div>
          </div>
          <div style={{display:"flex", gap:8}}>
            <select className="chat-input" style={{width:120}} value={level} onChange={(e)=>setLevel(e.target.value)}>
              <option value="">Semua level</option>
              <option value="info">INFO</option>
              <option value="warn">WARN</option>
              <option value="error">ERROR</option>
            </select>
            <input className="chat-input" style={{maxWidth:220}} placeholder="Cari log..." value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
        </div>
        <div style={{maxHeight:520, overflowY:"auto", background:"#0a0d13", border:"1px solid var(--border)", borderRadius:8, padding:12, fontFamily:"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize:"0.78rem", lineHeight:1.6}}>
          {filtered.length === 0
            ? <div style={{color:"var(--text-muted)"}}>Tidak ada log.</div>
            : filtered.map((l,i)=>(
                <div key={i} style={{
                  whiteSpace:"pre-wrap", wordBreak:"break-word",
                  color: l.includes(" ERROR ")||l.includes(" ERR ") ? "var(--danger)" : l.includes(" WARN ") ? "var(--warning)" : "var(--text-muted)"
                }}>{l}</div>
              ))}
        </div>
      </div>
    </div>
  );
}
