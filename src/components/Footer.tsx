import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

interface FooterProps {
  title: string;
  subtitle: string;
}

const Footer = ({ title, subtitle }: FooterProps) => {
  return (
    <footer className="relative bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white px-6 py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-violet-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-300 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-screen-xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <p className="text-lg text-violet-200 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Social links with enhanced styling */}
        <div className="flex justify-center items-center gap-8">
          <Link
            href="https://www.linkedin.com/in/mahmoudsalama1/"
            target="_blank"
            className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/25"
          >
            <FaLinkedinIn className="text-2xl group-hover:text-blue-300 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="https://github.com/Mooddex"
            target="_blank"
            className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/25"
          >
            <FaGithub className="text-2xl group-hover:text-gray-300 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 to-gray-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Bottom border line */}
        <div className="pt-8 mt-8 border-t border-white/20">
          <p className="text-sm text-violet-300/80">
            © 2025 {title.split(' ')[0]}. Crafted with passion and code.
          </p>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-white"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;