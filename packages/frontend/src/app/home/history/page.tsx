"use client";

import FormattedDate from "@/components/FormattedDate";
import { fetcher } from "@/helpers/fetcher";
import { IListGamesResponse } from "@pingpongpal/shared";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const pageSizes = [5, 10, 20] as const;
  const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>(
    pageSizes[0],
  );
  const [pageIndex, setPageIndex] = useState(0);

  const { data: gameData } = useSWR<IListGamesResponse>(
    `/api/v1/games?skip=${pageIndex * pageSize}&take=${pageSize}`,
    fetcher,
  );

  const totalCount = gameData?.totalCount || 0;

  return (
    <>
      <div className="flex flex-col gap-4 border border-border p-4 bg-secondary">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-main">Game history</h2>
          <select
            className="border border-border px-2 py-1 bg-secondary focus:outline-none"
            value={pageSize}
            onChange={(e) =>
              setPageSize(
                parseInt(e.target.value, 10) as (typeof pageSizes)[number],
              )
            }
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

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

        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(totalCount / pageSize) }).map(
            (_, index) => (
              <button
                key={index}
                className={`border border-border p-2 ${
                  index === pageIndex
                    ? "bg-main text-white"
                    : "bg-secondary text-white hover:bg-main-dark"
                }`}
                onClick={() => setPageIndex(index)}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
}
