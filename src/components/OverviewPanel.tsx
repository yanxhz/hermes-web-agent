export function OverviewPanel({ status }: { status: any }) {
  const components = status.components || {};
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
      <div className="card">
        <div className="card-header"><span className="card-title">Connection</span></div>
        <div className="kpi-value" style={{color:status.gateway_running?"var(--success)":"var(--danger)"}}>
          {status.gateway_running?"Online":"Offline"}
        </div>
        <div className="kpi-label">Gateway state: {status.gateway_state||"—"}</div>
        <div className="kpi-trend" style={{color:status.gateway_running?"var(--success)":"var(--danger)"}}>
          {status.active_sessions||0} active sessions
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Agent</span></div>
        <div className="kpi-value" style={{color:"var(--text)"}}>{status.provider||status.model||"—"}</div>
        <div className="kpi-label">Model: {status.model||"—"}</div>
        <div className="kpi-label">Base URL: {status.base_url||"—"}</div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Health</span></div>
        <div className="kpi-value" style={{color:"var(--success)"}}>OK</div>
        <div className="kpi-label">Storage: {components.storage?.status||"ok"}</div>
        <div className="kpi-label">Overall: {status.overall||"ok"}</div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Resources</span></div>
        <div className="kpi-label">CPU: {status.cpu_percent||"—"}%</div>
        <div className="kpi-label">Memory: {status.memory?.percent||"—"}%</div>
        <div className="kpi-label">Uptime: {status.uptime_seconds||"—"}s</div>
      </div>
    </div>
  );
}
