"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen  flex justify-center items-start py-10 overflow-y-auto">
      <div className="card">
        <div className="banner">
          <span className="banner-text">MEMBER?</span>
          <Link href="signin">
            <span className="banner-text">SIGN IN</span>
          </Link>
        </div>

        <span className="card__title">Welcome</span>
        <p className="card__subtitle">Create Your Account Today.</p>

       <button className="sign-up mr-5" onClick={() => signIn("google",{ callbackUrl: "/explore" })}>
                 Sign UP With Google
               </button>
      </div>
    </div>
  );
}
