export const CustomStyles: React.FC = () => (
  <style jsx>{`
    .bg-gradient-radial {
      background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    @keyframes float-delay {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(-8deg); }
    }
    
    @keyframes float-delay-2 {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-25px) rotate(12deg); }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-delay {
      animation: float-delay 8s ease-in-out infinite;
    }
    
    .animate-float-delay-2 {
      animation: float-delay-2 7s ease-in-out infinite;
    }
  `}</style>
);