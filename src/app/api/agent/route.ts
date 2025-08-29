// app/api/agent/route.ts — web‑search agent with citations
// ------------------------------------------------------------
import type { NextRequest } from "next/server";
import { authHeaders, openaiBase } from "@/lib/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { query } = (await req.json()) as { query: string };

  const body = {
    model: "gpt-4o",
    input: [
      { role: "system", content: "You are a research agent. Always browse when needed and include inline [#] citations matching the sources list you return at the end." },
      { role: "user", content: query },
    ],
    tools: [
      { type: "web_search" },
      { type: "file_search" },
    ],
    stream: true,
  };

  const res = await fetch(`${openaiBase}/responses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  const encoder = new TextEncoder();
  const reader = res.body?.getReader();
  const td = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      if (!reader) return controller.close();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += td.decode(value, { stream: true });
        const parts = buffer.split("");
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
            if (evt.type?.startsWith?.("response.tool_call.")) {
              // optionally surface tool events
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