import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

interface FooterProps {
  title: string;
  subtitle: string;
}

const Footer = ({ title, subtitle }: FooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center py-10 px-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-300">{subtitle}</p>
        </div>

        <div className="flex justify-center gap-6">
          <Link
            href="https://www.linkedin.com/in/mahmoudsalama1/"
            target="_blank"
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <FaLinkedinIn className="text-xl" />
          </Link>

          <Link
            href="https://github.com/Mooddex"
            target="_blank"
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            <FaGithub className="text-xl" />
          </Link>
        </div>

        <p className="text-sm text-gray-400 border-t border-gray-700 pt-6 mt-6">
          © 2025 {title.split(" ")[0]}. Built with passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
