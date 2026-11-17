export type Session = {
  id: string;
  title?: string;
  source?: string;
  model?: string;
  started_at?: number;
  last_active?: number;
  message_count?: number;
  tool_call_count?: number;
  is_active?: boolean;
  archived?: boolean;
  profile?: string;
  preview?: string;
};

export type Skill = {
  name: string;
  description?: string;
  enabled: boolean;
  provenance?: string;
  usage?: number;
  path?: string;
  category?: string;
};

export type Toolset = {
  name: string;
  label: string;
  description?: string;
  platform?: string;
  enabled: boolean;
  available?: boolean;
  configured?: boolean;
  tools?: string[];
};

export type StatusData = {
  gateway_running?: boolean;
  gateway_state?: string;
  gateway_platforms?: Record<string, any>;
  gateway_exit_reason?: string;
  gateway_health_url?: string;
  active_sessions?: number;
  active_agents?: number;
  version?: string;
  overall?: string;
  components?: { gateway?: {status:string;state:string}; storage?: {status:string}; dashboard?: {status:string}; platforms?: {status:string;configured:number;connected:number} };
  provider?: string;
  model?: string;
  base_url?: string;
  cpu_percent?: number;
  memory?: {total?:number; available?:number; used?:number; percent?:number};
  uptime_seconds?: number;
};

export type SessionHistory = Session;
