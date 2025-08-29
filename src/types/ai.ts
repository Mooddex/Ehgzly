// types/ai.ts
// ------------------------------------------------------------
export type Role = "system" | "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}

export interface ChatRequest {
  messages: Message[];
}

export interface AgentRequest {
  query: string;
}