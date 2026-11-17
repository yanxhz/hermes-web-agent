"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { OverviewPanel } from "@/components/OverviewPanel";
import { SessionsPanel } from "@/components/SessionsPanel";
import { SkillsPanel } from "@/components/SkillsPanel";
import { ToolsPanel } from "@/components/ToolsPanel";
import { TerminalPanel } from "@/components/TerminalPanel";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ChatPanel } from "@/components/ChatPanel";
import type { StatusData, Session, Skill, Toolset } from "@/types";

interface DashboardData {
  status: StatusData;
  sessions: Session[];
  skills: Skill[];
  toolsets: Toolset[];
  logs: string[];
  error?: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedSession, setSelectedSession] = useState<string>("");

  const tabs = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "chat", label: "Agent Chat", icon: "💬" },
    { id: "sessions", label: "Sessions", icon: "📋" },
    { id: "skills", label: "Skills", icon: "📦" },
    { id: "tools", label: "Tools", icon: "⚙️" },
    { id: "terminal", label: "Terminal Monitor", icon: "🖥️" },
    { id: "settings", label: "Settings", icon: "🔧" },
  ];

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      try {
        const [statusRes, sessionsRes, skillsRes, toolsRes, logsRes] = await Promise.all([
          fetch("/api/status"),
          fetch("/api/sessions?limit=50"),
          fetch("/api/skills"),
          fetch("/api/tools/toolsets"),
          fetch("/api/logs?file=agent&lines=200"),
        ]);
        if (cancelled) return;
        const results = await Promise.all([
          statusRes.json(),
          sessionsRes.json(),
          skillsRes.json(),
          toolsRes.json(),
          logsRes.json(),
        ]);
        const [status, sessions, skills, toolsets, logs] = results;
        setData({
          status: status as StatusData,
          sessions: sessions.sessions || sessions,
          skills: skills,
          toolsets: toolsets,
          logs: logs.lines || [],
        });
      } catch (e) {
        if (!cancelled) setData({ status: {} as StatusData, sessions: [], skills: [], toolsets: [], logs: [], error: String(e) });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="app" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)" }}>
        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>◈</div>
          <div>Loading Hermes Dashboard...</div>
        </div>
      </div>
    );
  }
  if (!data || data.error) {
    return (
      <div className="app" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)" }}>
        <div style={{ textAlign: "center", color: "var(--danger)" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>⚠</div>
          <div>Failed to load dashboard data</div>
          {data?.error && <pre style={{ marginTop: 16, color: "var(--text-muted)", fontSize: "0.8rem" }}>{data.error}</pre>}
        </div>
      </div>
    );
  }

  const { status, sessions, skills, toolsets, logs } = data;

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewPanel status={status} />;
      case "chat": return <ChatPanel sessions={sessions} onSelect={setSelectedSession} />;
      case "sessions": return <SessionsPanel sessions={sessions} onSelect={setSelectedSession} />;
      case "skills": return <SkillsPanel skills={skills} />;
      case "tools": return <ToolsPanel toolsets={toolsets} />;
      case "terminal": return <TerminalPanel logs={logs} />;
      case "settings": return <SettingsPanel tunnelUrl={status.gateway_health_url || ""} />;
      default: return <OverviewPanel status={status} />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} tabs={tabs} />
      <TopBar status={status} onRefresh={() => window.location.reload()} />
      <main className="main">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span className="section-title-text">{tabs.find(t => t.id === activeTab)?.label}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
