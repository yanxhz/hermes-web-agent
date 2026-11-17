"use client";
import type { Session } from "@/types";

export function SessionsPanel({ sessions, onSelect }: { sessions: Session[]; onSelect: (id:string)=>void }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Conversations</span>
        <span className="card-sub">{sessions.length} sessions</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Model</th>
              <th>Messages</th>
              <th>Tools</th>
              <th>Last Active</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s=>(
              <tr key={s.id} style={{cursor:"pointer"}} onClick={()=>onSelect(s.id)}>
                <td style={{fontWeight:600, maxWidth:240, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
                  {s.title || <span style={{color:"var(--text-muted)"}}>(untitled)</span>}
                </td>
                <td><span className="badge off">{s.source||"—"}</span></td>
                <td>{s.model||"—"}</td>
                <td>{s.message_count||0}</td>
                <td>{s.tool_call_count||0}</td>
                <td>{s.last_active ? new Date(s.last_active*1000).toLocaleString("id-ID",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}) : "—"}</td>
                <td>
                  {s.is_active
                    ? <span className="badge ok">● active</span>
                    : s.archived
                      ? <span className="badge off">archived</span>
                      : <span className="badge warn">ended</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
