"use client";

import { mutationFetcher } from "@/helpers/fetcher";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import googleImage from "../google.png";

export default function SignUp() {
  const { error, data, trigger } = useSWRMutation(
    "/api/v1/auth/signup",
    mutationFetcher<{ email: string; displayName: string; password: string }>(
      "POST",
      "Sign up",
    ),
  );

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const showLoginError = !!error || (data && !data.success);

  if (data?.success) {
    window.location.assign("/");
  }

  return (
    <>
      <Link
        className="flex justify-center items-center gap-2 h-14 border bg-white text-black rounded-full"
        href="/api/v1/auth/google"
      >
        <Image width={22} height={22} src={googleImage} alt="Google" />
        <span>Sign up with Google</span>
      </Link>
      <form
        className="flex flex-col my-8 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          trigger({ email, displayName, password });
        }}
      >
        <label>
          <div className="px-2">Email</div>
          <input
            className="w-full h-14 px-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <div className="px-2">Display Name</div>
          <input
            className="w-full h-14 px-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            type="text"
            placeholder="Enter your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <div className="px-2">Password</div>
          <input
            className="w-full h-14 px-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <div className="px-2">Repeat Password</div>
          <input
            className="w-full h-14 px-2 border border-gray-300 rounded-lg focus:outline-none text-black"
            type="password"
            placeholder="Enter your password again"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </label>
        {showLoginError && (
          <div className="text-red-500">Something went wrong</div>
        )}
        <button
          className="h-14 rounded-xl bg-main disabled:opacity-50"
          disabled={!password || password !== passwordAgain}
        >
          Sign Up
        </button>
      </form>
      <Link className="text-main" href="/auth/login">
        Already registered? Login
      </Link>
    </>
  );
}
