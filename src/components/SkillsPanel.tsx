"use client";
import { useState } from "react";
import type { Skill } from "@/types";

export function SkillsPanel({ skills }: { skills: Skill[] }) {
  const [q, setQ] = useState("");
  const filtered = skills.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    (s.description||"").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{display:"flex", flexDirection:"column", gap:16}}>
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">Installed Skills</span>
            <div className="card-sub">{skills.length} skills · {skills.filter(s=>s.enabled).length} enabled</div>
          </div>
          <input
            className="chat-input"
            style={{maxWidth:280}}
            placeholder="Cari skill..."
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Skill</th><th>Description</th><th>Provenance</th><th>Usage</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.slice(0,60).map(s=>(
                <tr key={s.name}>
                  <td style={{fontWeight:600}}>{s.name}</td>
                  <td style={{color:"var(--text-muted)", maxWidth:420}}>{(s.description||"").slice(0,140)}</td>
                  <td><span className="badge off">{s.provenance||"agent"}</span></td>
                  <td>{s.usage||0}</td>
                  <td>{s.enabled
                    ? <span className="badge ok">enabled</span>
                    : <span className="badge off">disabled</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
