import { getEventById } from "@/app/actions/events";
import NotFound from "@/app/not-found";
import Image from "next/image";
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";

async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let event;
  try {
    event = await getEventById(id);
  } catch (error) {
    console.log(error);
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Event Image */}
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Event Info */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
        <p className="text-gray-600 text-base line-clamp-3">
          {event.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-500" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-green-600">
          <DollarSign className="w-5 h-5" />
          <span>{event.price}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Edit
        </button>
        <button className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
          Delete
        </button>
        <button className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
          Book
        </button>
      </div>
    </div>
  );
}

export default EventPage;
