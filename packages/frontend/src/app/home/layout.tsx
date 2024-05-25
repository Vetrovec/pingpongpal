"use client";

import { mutationFetcher } from "@/helpers/fetcher";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWRMutation from "swr/mutation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  const pathname = usePathname();

  const { trigger: triggerLogout } = useSWRMutation(
    "/api/v1/auth/logout",
    mutationFetcher("POST"),
    {
      onSuccess: () => {
        window.location.assign("/");
      },
    },
  );

  return (
    <div>
      <div className="flex p-4 bg-main-dark justify-between">
        <h1 className="text-xl font-bold">PingPongPal</h1>
        <div className="flex items-center">
          <div className="text-md font-medium">{user.displayName}</div>
          <div className="w-1 h-full mx-2 bg-white opacity-50" />
          <button onClick={() => triggerLogout()}>Logout</button>
        </div>
      </div>

      <div className="container flex p-2 mx-auto gap-1">
        <div className="w-48 flex flex-col items-stretch gap-2 border border-border p-4 bg-secondary">
          <Link href="/home/history">
            <button
              className={`w-full p-1 rounded-md hover:bg-main-dark ${
                pathname === "/home/history" ? "bg-main" : "bg-border"
              }`}
            >
              History
            </button>
          </Link>
          <Link href="/home/statistics">
            <button
              className={`w-full p-1 rounded-md hover:bg-main-dark ${
                pathname === "/home/statistics" ? "bg-main" : "bg-border"
              }`}
            >
              Statistics
            </button>
          </Link>
          <Link href="/home/access-keys">
            <button
              className={`w-full p-1 rounded-md hover:bg-main-dark ${
                pathname === "/home/access-keys" ? "bg-main" : "bg-border"
              }`}
            >
              Access Keys
            </button>
          </Link>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
