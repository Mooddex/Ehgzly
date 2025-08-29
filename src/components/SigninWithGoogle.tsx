"use client";

import { signIn } from "next-auth/react"; 
import Link from "next/link";

export default function Signin() {
  return (
    <div className="min-h-screen flex justify-center items-start py-10 overflow-y-auto">
      <div className="card">
        <div className="banner">
          <span className="banner-text">Join us</span>
          <Link href="/signup">
            <span className="banner-text">SIGN UP</span>
          </Link>
        </div>

        <span className="card__title">H E Y !</span>
        <p className="card__subtitle">Get Back At It.</p>

        <button className="sign-up" onClick={() => signIn("google",{ callbackUrl: "/explore" })}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
