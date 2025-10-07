import { LucideIcon, Brain } from "lucide-react";
import { AIStarterCard } from "./AiStarterCard";

interface AIStarter {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
};

interface AIStartersSectionProps {
  aiStarters: AIStarter[];
  setIsHovered: (index: number | null) => void;
};

export const AIStartersSection: React.FC<AIStartersSectionProps> = ({ aiStarters, setIsHovered }) => (
  <div className="max-w-4xl mx-auto mb-16">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
        <Brain className="w-8 h-8 text-purple-600" />
        <span>AI Starters</span>
      </h2>
      <p className="text-gray-600 text-lg">Choose your intelligent companion</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {aiStarters.map((starter, index) => (
        <AIStarterCard
          key={starter.title}
          starter={starter}
          index={index}
          setIsHovered={setIsHovered}
        />
      ))}
    </div>
  </div>
);
