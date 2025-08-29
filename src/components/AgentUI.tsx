// components/AgentUI.tsx — search agent UI (client)
// ------------------------------------------------------------
"use client";
import React, { JSX, useState } from "react";

export function AgentUI(): JSX.Element {
  const [q, setQ] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  async function runAgent(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    setBusy(true);
    setOut("");

    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });

    if (!res.body) {
      setBusy(false);
      return;
    }

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