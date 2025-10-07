import { ArrowRight, LucideIcon } from "lucide-react";

interface AIStarter {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  gradient: string;
  bgColor: string;
  borderColor: string;
};
interface AIStarterCardProps {
  starter: AIStarter;
  index: number;
  setIsHovered: (index: number | null) => void;
};

export const AIStarterCard: React.FC<AIStarterCardProps> = ({ starter, index, setIsHovered }) => {
  const Icon = starter.icon;
  
  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(index)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-75 rounded-2xl blur transition duration-500"
           style={{ backgroundImage: `linear-gradient(135deg, ${starter.gradient.replace('from-', '').replace('to-', ', ')})` }}>
      </div>
      <a
        href={starter.href}
        className={`relative block bg-white/80 backdrop-blur-sm rounded-2xl p-8 border ${starter.borderColor} group-hover:border-gray-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
      >
        <div className={`absolute inset-0 ${starter.bgColor} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${starter.gradient} p-4 shadow-lg`}>
              <Icon className="w-full h-full text-white" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{starter.title}</h3>
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            {starter.description}
          </p>
        </div>
      </a>
    </div>
  );
};