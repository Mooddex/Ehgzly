import { Camera, ChevronLeft, ChevronRight, Music, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { TicketData} from "@/types/event";
export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  

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
      icon: Music,
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
      icon: Camera,
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
      icon: Palette,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tickets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickets.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % tickets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + tickets.length) % tickets.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl h-80 shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className={`w-full h-full flex-shrink-0 bg-gradient-to-br ${ticket.bgGradient} relative`}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 h-full flex items-center justify-between p-12">
              <div>
                <h2 className="text-5xl font-bold text-white mb-4">
                  {ticket.title}
                </h2>
                <p className="text-white/90 text-xl max-w-md">
                  {ticket.subtitle}
                </p>
              </div>
              <div className="text-8xl opacity-20">{ticket.image}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {tickets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
