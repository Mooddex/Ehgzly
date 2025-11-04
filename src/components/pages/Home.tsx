"use client";

import Hero from "@/components/pages/Hero";
import ExplorePage from "@/app/(elements)/explore/page";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();



  return (
    <>
      {session ? (
        <ExplorePage />
      ) : (
        <div>
          <Hero />
        </div>
      )}
    </>
  );
}