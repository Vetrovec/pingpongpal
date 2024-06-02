"use client";

import FormattedDate from "@/components/FormattedDate";
import Table from "@/components/Table";
import Tile from "@/components/Tile";
import { fetcher } from "@/helpers/fetcher";
import { IListGamesResponse } from "@pingpongpal/shared";
import { useState } from "react";
import useSWR from "swr";

export default function History() {
  const pageSizes = [5, 10, 20] as const;
  const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>(
    pageSizes[0],
  );
  const [pageIndex, setPageIndex] = useState(0);

  const { data } = useSWR<IListGamesResponse>(
    `/api/v1/games?skip=${pageIndex * pageSize}&take=${pageSize}`,
    fetcher,
  );

  const totalCount = data?.totalCount || 0;

  return (
    <Tile className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-main">Game history</h2>
        <select
          className="border border-border px-2 py-1 bg-secondary focus:outline-none"
          value={pageSize}
          onChange={(e) => {
            setPageIndex(0);
            setPageSize(
              parseInt(e.target.value, 10) as (typeof pageSizes)[number],
            );
          }}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <Table
        columns={["Date", "Player 1", "Player 2", "Score", "Temperature"]}
        rows={data?.games.map((game, i) => [
          <FormattedDate key={i} date={new Date(game.createdAt)} />,
          game.displayName1,
          game.displayName2,
          `${game.score1} - ${game.score2}`,
          `${game.temperature}°C`,
        ])}
      />

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
    </Tile>
  );
}
