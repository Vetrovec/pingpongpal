"use client";

import Tile from "@/components/Tile";
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
        <Tile className="w-48 flex flex-col items-stretch gap-2">
          <Link href="/home/history">
            <button
              className={`w-full p-1 rounded-md ${
                pathname === "/home/history"
                  ? "bg-main"
                  : "bg-border hover:bg-main-dark"
              }`}
            >
              History
            </button>
          </Link>
          <Link href="/home/statistics">
            <button
              className={`w-full p-1 rounded-md ${
                pathname === "/home/statistics"
                  ? "bg-main"
                  : "bg-border hover:bg-main-dark"
              }`}
            >
              Statistics
            </button>
          </Link>
          <Link href="/home/access-keys">
            <button
              className={`w-full p-1 rounded-md ${
                pathname === "/home/access-keys"
                  ? "bg-main"
                  : "bg-border hover:bg-main-dark"
              }`}
            >
              Access Keys
            </button>
          </Link>
        </Tile>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
