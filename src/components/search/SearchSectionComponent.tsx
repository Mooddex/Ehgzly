import { Zap } from "lucide-react";
import SearchBox from "./SearchBox";

export const SearchSection: React.FC = () => (
  <div className="w-full mx-auto mb-16">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-2">
        <Zap className="w-6 h-6 text-yellow-500" />
        <span>Quick Search</span>
      </h3>
      <p className="text-gray-600">Find anything, instantly</p>
    </div>
    <SearchBox />
  </div>
);