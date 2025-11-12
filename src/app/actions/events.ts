"use server";

import { eventSchema, TEditEventSchema,  EditEventSchema, TValidateEvent } from "@/lib/validators";
import { z } from "zod";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not defined");
}

// ✅ GET ALL EVENTS
export async function getEvents() {
  const res = await fetch(`${API_URL}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// ✅ GET SINGLE EVENT BY ID
export async function getEventById(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

// ADD EVENT
export async function addEventAction(newEvent: TValidateEvent) {
  // ✅ Validate BEFORE adding ID
  const validate = eventSchema.safeParse({
    ...newEvent,
    id: crypto.randomUUID(),
  });

  // ❌ If validation fails → return helpful error
  if (!validate.success) {
    return {
      success: false,
      message: "Validation failed",
      issues: validate.error.format(),
    };
  }

  const validEvent = validate.data;

  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validEvent),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to create event",
        status: res.status,
      };
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };

  } catch (error) {
    return {
      success: false,
      message: "Unexpected server error",
      error,
    };
  }
}



// ✅ UPDATE AN EVENT BY ID
export async function updateEventAction(id: string, updatedEvent: TEditEventSchema) {
  try {
    const validatedEvent = EditEventSchema.parse(updatedEvent);

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedEvent),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData.message || "Failed to update event" 
      };
    }

    const data = await res.json();
    return { success: true, data };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
      };
    }
    
    console.error("Update event error:", error);
    return {
      success: false,
      message: "Network error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ✅ DELETE EVENT BY ID
export async function deleteEventAction(id: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData.message || "Failed to delete event" 
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete event error:", error);
    return {
      success: false,
      message: "Network error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}