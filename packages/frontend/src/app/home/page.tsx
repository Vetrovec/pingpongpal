"use client";

import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

export default function Home() {
  useUser();

  redirect("/home/history");
}
