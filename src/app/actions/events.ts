"use server";

import { Event } from "@/types/event";

const API_URL = process.env.Api_Url;

// ✅ GET ALL EVENTS
export async function getEvents() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// ✅ GET SINGLE EVENT BY ID
export async function getEventById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

// ✅ ADD EVENT
export async function addEventAction(newEvent: Omit<Event, 'id'>) {
  try {
    // Generate ID here before sending to API
    const eventWithId = {
      ...newEvent,
      id: crypto.randomUUID()
    };

    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventWithId),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to create event" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Add event error:", error);
    return {
      success: false,
      message: "Network error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ✅ UPDATE AN EVENT BY ID
export async function updateEventAction(id: string, updatedEvent: Event) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to update event" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
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
      return { success: false, message: "Failed to delete event" };
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
