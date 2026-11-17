"use client";

export function SettingsPanel({ tunnelUrl }: { tunnelUrl: string }) {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:16, maxWidth:640}}>
      <div className="card">
        <div className="card-header"><span className="card-title">Gateway Connection</span></div>
        <div style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:"10px 16px", fontSize:"0.9rem"}}>
          <div style={{color:"var(--text-muted)"}}>Gateway status</div><div>—</div>
          <div style={{color:"var(--text-muted)"}}>Gateway state</div><div>—</div>
          <div style={{color:"var(--text-muted)"}}>Base URL</div><div>—</div>
          <div style={{color:"var(--text-muted)"}}>Provider</div><div>custom</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Authentication</span></div>
        <div style={{fontSize:"0.9rem", color:"var(--text-muted)"}}>
          Login dashboard dilindungi username/password (basic auth) di server Hermes. Pengaturan provider ada di halaman Settings dashboard Hermes asli.
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Tunnel (live chat)</span></div>
        <div style={{fontSize:"0.9rem", color:"var(--text-muted)"}}>
          URL tunnel dashboard Hermes asli untuk chat streaming langsung:
        </div>
        <div style={{marginTop:8, fontSize:"0.85rem", color:"var(--accent)", wordBreak:"break-all"}}>{tunnelUrl || "(belum dikonfigurasi — set HERMES_BACKEND_URL di Pages)"}</div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Model / Provider</span></div>
        <div style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:"10px 16px", fontSize:"0.9rem"}}>
          <div style={{color:"var(--text-muted)"}}>Default model</div><div>—</div>
          <div style={{color:"var(--text-muted)"}}>Provider</div><div>custom</div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Theme</span></div>
        <div style={{fontSize:"0.9rem", color:"var(--text-muted)"}}>
          Tema gelap aktif. Ganti tema lewat halaman Settings dashboard Hermes asli.
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Dashboard Preferences</span></div>
        <div style={{fontSize:"0.9rem", color:"var(--text-muted)"}}>
          Pengaturan tersimpan di browser (localStorage). Refresh otomatis setiap 60 detik.
        </div>
      </div>
    </div>
  );
}
