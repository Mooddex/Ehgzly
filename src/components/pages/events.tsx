import Link from "next/link";
import events from "@/db/events.json";
import EventCard from "../Cards/EventCard";
import AddNewEventButton from "../buttons/AddNewEvent";

export default function Events() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <AddNewEventButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((Event) => (
            <EventCard key={Event.id} event={Event} />
        ))}
      </div>
    </div>
  );
}
