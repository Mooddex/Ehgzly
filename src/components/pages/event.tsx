"use client";

import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types/event";
import { deleteEventAction } from "@/app/actions/events";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EventProps {
  event: Event;
}

export default function EventC({ event }: EventProps) {
    const router= useRouter()
  const handleDelete = async () => {
  toast.custom(
    (t) => (
      <div
        className={`
          flex flex-col sm:flex-row items-center justify-between gap-4
          bg-white dark:bg-gray-800 p-4 sm:px-6 rounded-xl shadow-lg
          border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto
          animate-slide-in
        `}
      >
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          Are you sure you want to delete this event?
        </span>

        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={async () => {
              toast.dismiss(t);
              const res = await deleteEventAction(event.id);
              if (res?.success) {
                toast.success("Event deleted!");
                router.push("/event/all");
              } else {
                toast.error("Failed to delete!");
              }
            }}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(t)}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium transition"
          >
            No
          </button>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
};


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
        <Link href={`/event/${event.id}/edit`}>
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            type="button"
          >
            Edit
          </button>
        </Link>

        <button
          onClick={handleDelete}
          className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          Delete
        </button>

        <button className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
          Book
        </button>
      </div>
    </div>
  );
}
