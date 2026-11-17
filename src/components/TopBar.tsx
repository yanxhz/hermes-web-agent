"use client";

export function TopBar({
  status, onRefresh,
}: {
  status: any; onRefresh: ()=>void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="status-chip">
          <span className="pulse"></span>
          {status.gateway_running ? "Online" : "Offline"}
          <span style={{marginLeft:6,color:"var(--text-muted)",fontWeight:400,fontSize:0.75}}>
            {status.gateway_state||""}
          </span>
        </div>
      </div>
      <div className="topbar-right">
        <span style={{color:"var(--text-muted)",fontSize:0.78}}>Program: {status.version||"—"}</span>
        <span style={{color:"var(--text-muted)",fontSize:0.78}}>Sessions: {status.active_sessions||0}</span>
        <button className="small-btn" onClick={onRefresh}>Refresh</button>
        <button className="primary-btn">Dashboard</button>
      </div>
    </header>
  );
}
