import { Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full px-6 py-2 mb-6 border border-purple-200">
      <Sparkles className="w-4 h-4 text-purple-600" />
      <span className="text-purple-700 text-sm font-medium">AI Powered Experience</span>
    </div>
    <h1 className="text-7xl font-black bg-gradient-to-r from-gray-800 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
      Explore
      <br />
      <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
        The Fun
      </span>
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Step into a world where artificial intelligence meets human creativity. 
      Discover Events that Rise your Dopamine .
    </p>
  </div>
);