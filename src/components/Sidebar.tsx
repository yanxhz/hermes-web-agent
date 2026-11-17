export function Sidebar({
  activeTab, onSelect, tabs,
}: {
  activeTab: string; onSelect: (id:string)=>void; tabs: {id:string; label:string; icon:string}[];
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="dot"></span>
        Hermes Remote
      </div>
      <nav className="nav">
        {tabs.map(t=>(
          <button
            key={t.id}
            className={`nav-item ${activeTab===t.id?"active":""}`}
            onClick={()=>onSelect(t.id)}
          >
            <span className="icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
      <div className="nav-footer">
        Web Dashboard v1.0<br></br>
        <span style={{color:"var(--text-muted)",fontSize:"0.75rem"}}>
          Remote control panel for Hermes AI Agent
        </span>
      </div>
    </aside>
  );
}
