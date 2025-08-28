// Next.js 15 (App Router) — JavaScript starter to:
// 1) Build a streaming AI chatbot (/chat)
// 2) Build a web‑search agent that can browse and cite (/search-agent)
//
// ✅ Uses: Next.js App Router, edge runtime, OpenAI Responses API, Vercel AI SDK (optional)
// ✅ JS only (no TypeScript)
// ✅ Secure server routes (no API keys in the browser)
// ✅ Works on localhost and Vercel
//
// ------------------------------------------------------------
// Project structure (create these files)
// ------------------------------------------------------------
// .env.local
// app/page.jsx
// app/(chat)/chat/page.jsx
// app/(agent)/search-agent/page.jsx
// app/api/chat/route.js
// app/api/agent/route.js
// lib/openai.js
// components/ChatUI.jsx
// components/AgentUI.jsx

// ------------------------------------------------------------
// 0) .env.local — put at project root
// ------------------------------------------------------------
// OPENAI_API_KEY=sk-...  // your key
// (Optional) OPENAI_PROJECT=proj_... // if you use projects

// ------------------------------------------------------------
// 1) lib/openai.js — tiny helper (server-only)
// ------------------------------------------------------------
export const openaiBase = "https://api.openai.com/v1";

export function authHeaders() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("Missing OPENAI_API_KEY");
  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  if (process.env.OPENAI_PROJECT) headers["OpenAI-Project"] = process.env.OPENAI_PROJECT;
  return headers;
}

// ------------------------------------------------------------
// 2) components/ChatUI.jsx — simple chat box (client component)
// ------------------------------------------------------------
"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([{ role: "system", content: "You are a helpful assistant." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    // Stream back tokens
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let assistant = { role: "assistant", content: "" };
    setMessages((m) => [...m, assistant]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      assistant.content += chunk;
      setMessages((m) => m.map((msg, i) => (i === m.length - 1 ? assistant : msg)));
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">💬 AI Chatbot</h1>
      <div ref={boxRef} className="h-[420px] overflow-y-auto rounded-2xl border p-4 space-y-3">
        {messages.filter(m => m.role !== "system").map((m, idx) => (
          <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-gray-200" : "bg-gray-100"}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 rounded-2xl border px-4 py-3 outline-none"
          placeholder="Ask anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={loading} className="rounded-2xl border px-4 py-3 hover:bg-gray-50 disabled:opacity-50">Send</button>
      </form>
    </div>
  );
}

// ------------------------------------------------------------
// 3) components/AgentUI.jsx — search agent UI (client)
// ------------------------------------------------------------
"use client";
import { useState } from "react";

export function AgentUI() {
  const [q, setQ] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  async function runAgent(e) {
    e.preventDefault();
    if (!q.trim()) return;
    setBusy(true);
    setOut("");

    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setOut((prev) => prev + decoder.decode(value));
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">🔎 Web‑Search Agent</h1>
      <form onSubmit={runAgent} className="flex gap-2">
        <input className="flex-1 rounded-2xl border px-4 py-3" placeholder="e.g. latest UFC main card for Egypt viewers…" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button disabled={busy} className="rounded-2xl border px-4 py-3 hover:bg-gray-50 disabled:opacity-50">Search</button>
      </form>
      <pre className="whitespace-pre-wrap rounded-2xl border p-4 min-h-48">{out || (busy ? "Searching…" : "Results will appear here with citations.")}</pre>
    </div>
  );
}

// ------------------------------------------------------------
// 4) app/(chat)/chat/page.jsx — page that mounts ChatUI
// ------------------------------------------------------------
import ChatUI from "@/components/ChatUI";
export default function Page(){ return <ChatUI/> }

// ------------------------------------------------------------
// 5) app/(agent)/search-agent/page.jsx — page that mounts AgentUI
// ------------------------------------------------------------
import { AgentUI } from "@/components/AgentUI";
export default function Page(){ return <AgentUI/> }

// ------------------------------------------------------------
// 6) app/page.jsx — simple index links
// ------------------------------------------------------------
import Link from "next/link";
export default function Home(){
  return (
    <main className="mx-auto max-w-xl p-8 space-y-4">
      <h1 className="text-3xl font-bold">AI Starters</h1>
      <ul className="list-disc pl-6">
        <li><Link className="underline" href="/chat">Chatbot</Link></li>
        <li><Link className="underline" href="/search-agent">Search Agent</Link></li>
      </ul>
    </main>
  );
}

// ------------------------------------------------------------
// 7) app/api/chat/route.js — streaming chat via Responses API
// ------------------------------------------------------------
// Runtime: edge (fast, streams)
export const runtime = "edge";

import { authHeaders, openaiBase } from "@/lib/openai";

export async function POST(req) {
  const { messages } = await req.json();

  // Minimal Responses API call with streaming
  const body = {
    model: "gpt-4o", // or a newer text-capable model available to your account
    input: messages.map(m => ({ role: m.role, content: m.content })),
    stream: true,
  };

  const res = await fetch(`${openaiBase}/responses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  // The API returns Server-Sent Events (SSE). We convert SSE -> plain text stream
  const encoder = new TextEncoder();
  const reader = res.body.getReader();
  const sseDecoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += sseDecoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const part of parts) {
          if (!part.startsWith("data:")) continue;
          const json = part.slice(5).trim();
          if (json === "[DONE]") continue;
          try {
            const evt = JSON.parse(json);
            if (evt.type === "response.output_text.delta") {
              controller.enqueue(encoder.encode(evt.delta));
            }
            if (evt.type === "response.error") {
              controller.enqueue(encoder.encode("\n[error] " + evt.error.message));
            }
          } catch {}
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

// ------------------------------------------------------------
// 8) app/api/agent/route.js — web‑search agent with citations
// ------------------------------------------------------------
export const runtime = "edge";
import { authHeaders, openaiBase } from "@/lib/openai";

export async function POST(req) {
  const { query } = await req.json();

  const body = {
    model: "gpt-4o", // pick your latest model
    input: [
      { role: "system", content: "You are a research agent. Always browse when needed and include inline [#] citations matching the sources list you return at the end." },
      { role: "user", content: query },
    ],
    // Enable built‑in tools
    tools: [
      { type: "web_search" },
      { type: "file_search" }, // enables retrieval if you attach vector stores later
    ],
    stream: true,
  };

  const res = await fetch(`${openaiBase}/responses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  // Pipe SSE to plain text for the UI. The model will emit text + citations
  const encoder = new TextEncoder();
  const reader = res.body.getReader();
  const td = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += td.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const part of parts) {
          if (!part.startsWith("data:")) continue;
          const json = part.slice(5).trim();
          if (json === "[DONE]") continue;
          try {
            const evt = JSON.parse(json);
            if (evt.type === "response.output_text.delta") {
              controller.enqueue(encoder.encode(evt.delta));
            }
            // Optional: surface tool events
            if (evt.type?.startsWith?.("response.tool_call.")) {
              controller.enqueue(encoder.encode(""));
            }
          } catch {}
        }
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

// ------------------------------------------------------------
// 9) Usage
// ------------------------------------------------------------
// 1. npm i next react react-dom
// 2. Create files as above. Put your key in .env.local
// 3. npm run dev
// 4. Open /chat and /search-agent
//
// Attach your own data later:
// - Upload files & create a vector store, then attach it to the request for file_search
// - Add function calling: include a tool of { type: "function", name, description, parameters } and execute in your route
//
// Notes:
// - This starter streams using the OpenAI Responses API SSE event types, extracting `response.output_text.delta` tokens for smooth UX.
// - Keep keys server-side. Never call OpenAI directly from the browser.
