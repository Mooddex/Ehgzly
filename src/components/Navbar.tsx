"use client";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { Home, LogIn, UserPlus, User, PartyPopper } from "lucide-react";

const Nav = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-4 flex items-center gap-8 border border-slate-700/50 ring-1 ring-white/10 ">
      {/* shared pages in the navbar */}
      
      {/* if logged in */}
      {session ? (
        // signed in user
        <>
          <Link
            href="/explore"
            className="group flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 relative"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-300">
              <Home
                size={20}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="hidden md:inline font-medium">Explore</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
          </Link>

          <Link
            href="/events"
            className="group flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-all duration-300 relative"
          >
            <div className="p-2 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-all duration-300">
              <PartyPopper
                size={20}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="hidden md:inline font-medium">Events</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
          </Link>

          <Link
            href="/profile"
            className="group flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-all duration-300 relative"
          >
            <div className="p-2 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300">
              <User
                size={20}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="hidden md:inline font-medium">Profile</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <button
       onClick={() => signOut({ redirectTo: "/" })}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition font-semibold">
        Sign Out
      </button> 
        </>
      ) : (
        // not signed in user
        <>
          <div className="h-8 w-px bg-slate-600/50"></div>
          <Link
        href="/"
        className="group flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 relative"
      >
        <div className="p-2 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-300">
          <Home
            size={20}
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="hidden md:inline font-medium">Home</span>
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
      </Link>
          <Link
            href="/signin"
            className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-300 relative px-4 py-2 rounded-xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            <LogIn
              size={18}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="hidden md:inline font-medium">Sign In</span>
          </Link>

          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white transition-all duration-300 px-4 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
          >
            <UserPlus
              size={18}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="hidden md:inline font-medium">Sign Up</span>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
