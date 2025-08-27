import Image from "next/image";
import HeroImg from "@/img/The-Rooftop-at-Pier-17-concert.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-12 py-16 bg-gray-50">
      {/* Left side: text + buttons */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-600">
          Find The Perfect Event
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold">
          Book The Perfect Spot
        </h2>

        <div className="space-x-4">
          <button className=" btn px-6 py-2 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition">
            <Link href="/signup">Sign Up</Link>
            
          </button>
          <button  className=" px-6 py-2 border border-cyan-600 text-cyan-600 rounded-lg shadow hover:bg-green-200 transition cursor-pointer">
            <Link href="/signin">Log In</Link>
          </button>
        </div>
      </div>

      {/* Right side: image */}
      <div className="flex justify-center">
        <Image
          src={HeroImg}
          width={500}
          height={500}
          className="rounded-lg shadow-lg object-cover"
          alt="Concert event"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
