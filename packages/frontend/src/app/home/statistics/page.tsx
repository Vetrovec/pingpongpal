"use client";

import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/v1/statistics", fetcher);

  return (
    <>
      <div className="flex flex-col gap-4 border border-border p-4 bg-secondary">
        <h2 className="text-xl font-bold text-main">Games played</h2>
        <table className="w-full border border-border">
          <thead>
            <tr className="text-main">
              <th className="border border-border p-2">Player</th>
              <th className="border border-border p-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {data?.count.map((row: any, i: number) => (
              <tr key={i}>
                <td className="border border-border p-2">{row.nickname}</td>
                <td className="border border-border p-2">{row.gameCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
        <h2 className="text-xl font-bold text-main">Total wins</h2>
        <table className="w-full border border-border">
          <thead>
            <tr className="text-main">
              <th className="border border-border p-2">Player</th>
              <th className="border border-border p-2">Wins</th>
            </tr>
          </thead>
          <tbody>
            {data?.leaderboard.map((row: any, i: number) => (
              <tr key={i}>
                <td className="border border-border p-2">{row.nickname}</td>
                <td className="border border-border p-2">{row.totalWins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
