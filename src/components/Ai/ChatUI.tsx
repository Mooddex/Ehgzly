'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-[300px] w-full max-w-md mx-auto my-10 bg-white border rounded-lg shadow">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            <span
              className={`font-semibold ${
                message.role === 'user' ? 'text-blue-600' : 'text-green-600'
              }`}
            >
              {message.role === 'user' ? 'You: ' : 'AI: '}
            </span>
            {message.parts.map((part, i) => {
              if (part.type === 'text') {
                return <span key={`${message.id}-${i}`}>{part.text}</span>;
              }
            })}
          </div>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput('');
        }}
        className="flex p-3 border-t bg-white"
      >
        <input
          className="flex-1 p-2 border border-zinc-300 rounded-l"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="px-4 bg-blue-600 text-white rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
