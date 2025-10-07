import { Stars, Sparkles, Zap } from "lucide-react";
interface FloatingElementsProps {
  className?: string; // 👈 allow className
}
export const FloatingElements: React.FC<FloatingElementsProps> = () => (
  <>
    <div className="fixed top-20 left-10 animate-float">
      <Stars className="w-6 h-6 text-purple-400/70" />
    </div>
    <div className="fixed top-40 right-16 animate-float-delay">
      <Sparkles className="w-8 h-8 text-cyan-500/60" />
    </div>
    <div className="fixed bottom-32 left-20 animate-float-delay-2">
      <Zap className="w-5 h-5 text-pink-500/70" />
    </div>
  </>
);