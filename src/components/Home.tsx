"use client";

import Hero from "@/components/Hero";
import ExplorePage from "@/app/(elements)/explore/page";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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