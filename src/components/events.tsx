import Link from "next/link";
import events from "@/db/events.json";
import EventCard from "./EventCard";

export default function Events() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <Link href="/events/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
            + Add New
          </button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((Event) => (
            <EventCard key={Event.id} event={Event} />
        ))}
      </div>
    </div>
  );
}
