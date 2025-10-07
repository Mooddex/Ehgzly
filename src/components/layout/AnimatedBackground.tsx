
interface MousePosition {
  x: number;
  y: number;
};
interface AnimatedBackgroundProps {
  mousePosition: MousePosition;
}
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mousePosition }) => (
    
          <div className="fixed inset-0 z-0">
    <div 
      className="absolute w-96 h-96 bg-gradient-radial from-purple-200/30 to-transparent rounded-full blur-xl transition-all duration-1000 ease-out"
      style={{
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
      }}
    ></div>
    <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-radial from-cyan-200/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
    <div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-gradient-radial from-pink-200/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
  </div>
)   
