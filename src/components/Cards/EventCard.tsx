"use client";

import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import { Event } from "@/types/event";
import Image from "next/image";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <Image
  src={`${event.image}`}
  alt={event.title}
  width={0}
  height={0}
  sizes="100vw"
  className="w-full h-48 object-cover"
/>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
        
        <div className="mt-3 space-y-2 text-gray-500 text-sm">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            {event.date}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            {event.location}
          </p>
          <p className="flex items-center gap-2 font-medium text-green-600">
            <DollarSign className="w-4 h-4" />
            {event.price}
          </p>
        </div>
      </div>
    </div>
  );
}
