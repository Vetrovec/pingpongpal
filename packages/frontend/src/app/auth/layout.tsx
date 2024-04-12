"use client";

import Image from "next/image";
import landingImage from "./landing.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full p-8">
      <h1 className="text-6xl mb-12 text-center lg:text-left">Pingpongpal</h1>
      <div className="flex flex-1 items-center justify-around gap-4">
        <div className="w-96 shrink-0">{children}</div>
        <div className="hidden lg:block overflow-hidden rounded-xl">
          <Image src={landingImage} alt="Landing" />
        </div>
      </div>
    </div>
  );
}
