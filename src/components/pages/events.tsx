import Link from "next/link";
import EventCard from "../Cards/EventCard";
import { getEvents } from "@/app/actions/events";
import { Event } from "@/types/event";

export default async function Events() {
  const data = await getEvents()
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
      
        <Link href="/event/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
            + Add New
          </button>
        </Link>
      </div>
       <div className="m-3 border-black font-bold text-lg border-2 p-2 w-55 text-center">
        Number of Events : {data.length}
        </div> 
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((event:Event) => (
            <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
