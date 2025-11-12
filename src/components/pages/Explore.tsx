"use client";
import { useState, useEffect } from "react";
import { Bot, Globe } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { AIStartersSection } from "@/components/Cards/AllAistartersCard";
import { FloatingElements } from "@/components/layout/FloatingElementsComponent";
import { HeroSection } from "@/components/layout/HeroSection";
import { SearchSection } from "@/components/search/SearchSectionComponent";
import { Slider } from "@/components/layout/Slider";
import {AIStarter} from '@/types/exploreTypes'
import {MousePosition} from '@/types/exploreTypes'
import { motion } from "framer-motion";
import AnimatedSection from "@/app/template"

export default function Explore() {
     const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [, setIsHovered] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const aiStarters: AIStarter[] = [
    {
      title: "Chatbot",
      href: "/chat",
      icon: Bot,
      description: "Intelligent conversation partner",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Search Agent",
      href: "/search-agent",
      icon: Globe,
      description: "Advanced web exploration",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  return (
  <motion.div
      initial={{ opacity: 0, y: 50 }}   // starting state
      animate={{ opacity: 1, y: 0 }}    // target state
      transition={{ duration: 0.6, ease: "easeOut" }} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
  <AnimatedBackground mousePosition={mousePosition} />

<div className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth flex flex-col gap-20 p-3">
        <AnimatedSection >
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection>
          <Slider />
        </AnimatedSection>

        <AnimatedSection>
          <AIStartersSection aiStarters={aiStarters} setIsHovered={setIsHovered} />
        </AnimatedSection>

        <AnimatedSection>
          <SearchSection />
        </AnimatedSection>
      </div>

      <FloatingElements className="absolute inset-0 z-20 pointer-events-none" />
    </motion.div>
  );
}

