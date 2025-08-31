// components/ChatUI.tsx — simple chat box (client component)
// ------------------------------------------------------------
"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Message } from "@/types/ai";
import { JSX } from "react/jsx-dev-runtime";

export default function ChatUI(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
   const newMessage: Message = { role: "user", content: input };
   const next = [...messages, newMessage];
   setMessages(next);

    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    // Stream back tokens
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    const assistant: Message = { role: "assistant", content: "" };
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
        {messages.filter((m) => m.role !== "system").map((m, idx) => (
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
