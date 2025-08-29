"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Star, Music, Camera, Palette } from "lucide-react";

// Interface for card/ticket data
interface TicketData {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  rating: number;
  image: string;
  bgGradient: string;
  icon: any;
}

// Sample ticket/card data
const tickets: TicketData[] = [
  {
    id: 1,
    title: "Summer Music Festival",
    subtitle: "Live Concert Experience",
    date: "Aug 30, 2025",
    time: "7:00 PM",
    location: "Central Park, NYC",
    price: "$85.00",
    category: "Music",
    rating: 4.8,
    image: "🎵",
    bgGradient: "from-purple-500 to-pink-500",
    icon: Music
  },
  {
    id: 2,
    title: "Photography Workshop",
    subtitle: "Master Your Camera Skills",
    date: "Sep 5, 2025", 
    time: "10:00 AM",
    location: "Studio Downtown",
    price: "$120.00",
    category: "Workshop",
    rating: 4.9,
    image: "📸",
    bgGradient: "from-blue-500 to-teal-500",
    icon: Camera
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    subtitle: "Contemporary Art Exhibition",
    date: "Sep 12, 2025",
    time: "6:30 PM", 
    location: "Modern Art Museum",
    price: "$45.00",
    category: "Art",
    rating: 4.7,
    image: "🎨",
    bgGradient: "from-orange-500 to-red-500",
    icon: Palette
  }
];

export default function TicketSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tickets.length) % tickets.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tickets.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const currentTicket = tickets[currentIndex];
  const IconComponent = currentTicket.icon;

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8 px-4">
      <div
        className="relative h-[500px] mx-12 group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Ticket Card */}
        <div className={`relative h-full bg-gradient-to-br ${currentTicket.bgGradient} rounded-2xl shadow-2xl transition-all duration-500 ease-in-out cursor-pointer transform group-hover:-translate-y-2 group-hover:shadow-3xl overflow-hidden`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-8xl transform rotate-12">
              {currentTicket.image}
            </div>
            <div className="absolute bottom-10 left-10 text-6xl transform -rotate-12 opacity-50">
              {currentTicket.image}
            </div>
          </div>

          {/* Ticket Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <IconComponent className="w-8 h-8" />
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {currentTicket.category}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{currentTicket.rating}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center">
              <div className="text-6xl mb-4">{currentTicket.image}</div>
              <h2 className="text-4xl font-bold mb-2">{currentTicket.title}</h2>
              <p className="text-xl opacity-90 mb-6">{currentTicket.subtitle}</p>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{currentTicket.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{currentTicket.time}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{currentTicket.location}</span>
                </div>
                <div className="text-2xl font-bold">
                  {currentTicket.price}
                </div>
              </div>
            </div>

            {/* Ticket Perforations */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full -ml-4"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full -mr-4"></div>
            
            {/* Dotted line across middle */}
            <div className="absolute left-8 right-8 top-1/2 border-t-2 border-dashed border-white border-opacity-30 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-0 top-1/2 transform h-[460px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group transition-all duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-gray-400 group-hover:text-white w-6 h-6" />
      </button>
      
      <button
        className="absolute right-0 top-1/2 transform h-[460px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group transition-all duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="text-gray-400 group-hover:text-white w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6">
        {tickets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-12 mx-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#beff46]"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Ticket Counter */}
      <div className="text-center mt-4 text-gray-600">
        <span className="text-lg font-medium">
          {currentIndex + 1} of {tickets.length}
        </span>
      </div>
    </div>
  );
}