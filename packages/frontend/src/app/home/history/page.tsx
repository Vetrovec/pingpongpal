"use client";

import FormattedDate from "@/components/FormattedDate";
import { fetcher } from "@/helpers/fetcher";
import { IListGamesResponse } from "@pingpongpal/shared";
import useSWR from "swr";

export default function Home() {
  const { data: gameData } = useSWR<IListGamesResponse>(
    "/api/v1/games",
    fetcher,
  );

  return (
    <>
      <div className="flex flex-col gap-4 border border-border p-4 bg-secondary">
        <h2 className="text-xl font-bold text-main">Game history</h2>
        <table className="w-full border border-border">
          <thead>
            <tr className="text-main">
              <th className="border border-border p-2">Date</th>
              <th className="border border-border p-2">Player 1</th>
              <th className="border border-border p-2">Player 2</th>
              <th className="border border-border p-2">Score</th>
              <th className="border border-border p-2">Temperature</th>
            </tr>
          </thead>
          <tbody>
            {gameData?.games.map((game) => (
              <tr key={game.id}>
                <td className="border border-border p-2">
                  <FormattedDate date={new Date(game.createdAt)} />
                </td>
                <td className="border border-border p-2">
                  {game.displayName1}
                </td>
                <td className="border border-border p-2">
                  {game.displayName2}
                </td>
                <td className="border border-border p-2">
                  {game.score1} - {game.score2}
                </td>
                <td className="border border-border p-2">
                  {game.temperature}°C
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
