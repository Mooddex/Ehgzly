// app/api/chat/route.ts — streaming chat via Responses API
// ------------------------------------------------------------
import type { NextRequest } from "next/server";
import { authHeaders, openaiBase } from "@/lib/openai";
import type { Message } from "@/types/ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const bodyJson = await req.json();
  const { messages } = bodyJson as { messages: Message[] };

  const body = {
    model: "gpt-4o",
    input: messages.map((m) => ({ role: m.role, content: m.content })),
    stream: true,
  };

  const res = await fetch(`${openaiBase}/responses`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });

  const encoder = new TextEncoder();
  const reader = res.body?.getReader();
  const sseDecoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      if (!reader) return controller.close();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += sseDecoder.decode(value, { stream: true });
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
            if (evt.type === "response.error") {
              controller.enqueue(encoder.encode("[error] " + evt.error.message));
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