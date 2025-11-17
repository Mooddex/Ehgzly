"use client";

import { user } from "@/types/User";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MapPin, Phone, AtSign, ShieldCheck } from "lucide-react";

interface userProps {
  User: user;
}

export default function UserProfile({ User }: userProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-purple-900 to-violet-800 p-4 overflow-hidden">

      {/* 🔮 Ambient Floating Backgrounds */}
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -top-20 -left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl bottom-20 right-0 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20"
      >
        {/* 🌄 Cover Photo */}
        <div className="relative h-40 w-full">
          <Image
            src={User.cover || "/cover.jpg"}
            alt="cover"
            fill
            className="object-cover opacity-80"
          />
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* 👤 Photo + Name */}
          <div className="flex flex-col items-center -mt-16">
            <Image
              src={User.photo}
              alt={User.name}
              width={110}
              height={110}
              className="rounded-full border-4 border-white shadow-lg"
            />

            <h1 className="text-2xl font-semibold text-white mt-4 drop-shadow">
              {User.name}
            </h1>
            {User.username && (
              <p className="text-sm text-gray-300">@{User.username}</p>
            )}
          </div>

          {/* 📍 Info Fields */}
          <div className="mt-6 space-y-3 text-gray-200">
            <p className="flex items-center gap-2">
              <AtSign size={18} /> {User.email}
            </p>
            {User.phone && (
              <p className="flex items-center gap-2">
                <Phone size={18} /> {User.phone}
              </p>
            )}
            {User.location && (
              <p className="flex items-center gap-2">
                <MapPin size={18} /> {User.location}
              </p>
            )}
            {User.role && (
              <p className="flex items-center gap-2">
                <ShieldCheck size={18} /> {User.role}
              </p>
            )}
            {User.joined && (
              <p className="text-sm text-gray-400">Joined: {User.joined}</p>
            )}
          </div>

          {/* 📝 Bio */}
          {User.bio && (
            <p className="mt-4 text-center text-gray-200">{User.bio}</p>
          )}

          {/* 📊 Stats Section */}
          <div className="mt-6 grid grid-cols-3 text-center text-white">
            <div>
              <p className="text-xl font-semibold">{User.posts || 0}</p>
              <p className="text-sm text-gray-300">Posts</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{User.bookings || 0}</p>
              <p className="text-sm text-gray-300">Bookings</p>
            </div>
            <div>
              <p className="text-xl font-semibold">{User.likes || 0}</p>
              <p className="text-sm text-gray-300">Likes</p>
            </div>
          </div>

          {/* 🌐 Social Icons */}
          <div className="mt-6 flex justify-center gap-6 text-white">
            {User.linkedin && (
              <a
                href={User.linkedin}
                target="_blank"
                className="hover:text-blue-300 transition"
              >
                <FaLinkedin size={26} />
              </a>
            )}
            {User.github && (
              <a
                href={User.github}
                target="_blank"
                className="hover:text-gray-300 transition"
              >
                <FaGithub size={26} />
              </a>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition">
              Edit Profile
            </button>

            <button className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white">
              Settings
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
