// Cloudflare Pages Function: proxy /api/sessions -> Hermes backend (via tunnel)

interface Env {
  HERMES_BACKEND_URL?: string;
}

const SKIP_REQ_HEADERS = new Set([
  "host", "connection", "content-length", "cf-ray", "cf-connecting-ip",
  "cf-ipcountry", "x-forwarded-for", "x-forwarded-proto", "x-real-ip",
]);

const SKIP_RESP_HEADERS = new Set([
  "content-encoding", "transfer-encoding", "connection",
]);

export const onRequest = async (context: any) => {
  const { request, env } = context;
  const backend = (env.HERMES_BACKEND_URL || "http://localhost:9119").replace(/\/+$/, "");
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\//, "").replace(/\/+$/, "") || "sessions";
  const target = `${backend}/api/${path}${url.search}`;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const headers = new Headers();
  for (const [k, v] of request.headers) {
    if (SKIP_REQ_HEADERS.has(k)) continue;
    headers.set(k, v);
  }

  let body: BodyInit | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = request.body as unknown as BodyInit;
  }

  try {
    const res = await fetch(target, { method: request.method, headers, body, redirect: "manual" });
    const respHeaders = new Headers();
    res.headers.forEach((v, k) => {
      if (SKIP_RESP_HEADERS.has(k)) return;
      respHeaders.set(k, v);
    });
    respHeaders.set("Access-Control-Allow-Origin", "*");
    return new Response(res.body, { status: res.status, headers: respHeaders });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "backend_unreachable", detail: String(e), target }),
      { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } },
    );
  }
};
