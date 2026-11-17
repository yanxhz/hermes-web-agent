"use client";
import { useState } from "react";
import type { Toolset } from "@/types";

export function ToolsPanel({ toolsets }: { toolsets: Toolset[] }) {
  const [q, setQ] = useState("");
  const filtered = toolsets.filter(t => t.name.includes(q.toLowerCase()));
  return (
    <div style={{display:"flex", flexDirection:"column", gap:16}}>
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">Toolsets</span>
            <div className="card-sub">{toolsets.length} toolsets · {toolsets.filter(t=>t.enabled).length} enabled</div>
          </div>
          <input className="chat-input" style={{maxWidth:280}} placeholder="Cari toolset..." value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
        <div className="grid3">
          {filtered.map(t=>(
            <div key={t.name} style={{padding:16, border:"1px solid var(--border)", borderRadius:12, background: t.enabled?"rgba(124,154,255,0.06)":"transparent"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                <span style={{fontWeight:700}}>{t.label||t.name}</span>
                {t.enabled ? <span className="badge ok">enabled</span> : <span className="badge off">disabled</span>}
              </div>
              <div style={{fontSize:"0.8rem", color:"var(--text-muted)", minHeight:36}}>{(t.description||"").slice(0,120)}</div>
              <div style={{fontSize:"0.72rem", color:"var(--text-muted)", marginTop:8}}>
                {t.tools ? `${t.tools.length} tools` : "—"} · {t.platform||"cli"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
