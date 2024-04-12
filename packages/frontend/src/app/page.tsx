"use client";

import Button from "@/components/Button";
import FormattedDate from "@/components/FormattedDate";
import Input from "@/components/Input";
import { fetcher, mutationFetcher } from "@/helpers/fetcher";
import { useUser } from "@/hooks/useUser";
import { ICreateGameRequest, IListGamesResponse } from "@pingpongpal/shared";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Home() {
  const user = useUser();

  const { data, error, isLoading } = useSWR<IListGamesResponse>(
    "/api/v1/games",
    fetcher,
  );

  const [displayName1, setDisplayName1] = useState("");
  const [displayName2, setDisplayName2] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  const { trigger } = useSWRMutation(
    "/api/v1/games",
    mutationFetcher<ICreateGameRequest>("POST", "Create game"),
    {
      onSuccess: () => {
        setDisplayName1("");
        setDisplayName2("");
        setScore1("");
        setScore2("");
      },
    },
  );

  // Uses tailwind
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold">Welcome, {user.displayName}!</h1>

      <div className="flex flex-col gap-4 border border-gray-300 p-4 mt-4 bg-white">
        <h2 className="text-xl font-bold">Game history</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Player 1</th>
              <th className="border border-gray-300 p-2">Player 2</th>
              <th className="border border-gray-300 p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {data?.games.map((game) => (
              <tr key={game.id}>
                <td className="border border-gray-300 p-2">
                  <FormattedDate date={new Date(game.createdAt)} />
                </td>
                <td className="border border-gray-300 p-2">
                  {game.displayName1}
                </td>
                <td className="border border-gray-300 p-2">
                  {game.displayName2}
                </td>
                <td className="border border-gray-300 p-2">
                  {game.score1} - {game.score2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        className="flex flex-col gap-4 border border-gray-300 p-4 mt-4 bg-white"
        onSubmit={(event) => {
          event.preventDefault();
          trigger({
            displayName1,
            displayName2,
            score1: parseInt(score1, 10),
            score2: parseInt(score2, 10),
          });
        }}
      >
        <h2 className="text-xl font-bold">Create a game</h2>
        <Input
          placeholder="Display Name 1"
          value={displayName1}
          onChange={(event) => setDisplayName1(event.target.value)}
        />
        <Input
          placeholder="Display Name 2"
          value={displayName2}
          onChange={(event) => setDisplayName2(event.target.value)}
        />
        <Input
          placeholder="Score 1"
          value={score1}
          onChange={(event) => setScore1(event.target.value)}
        />
        <Input
          placeholder="Score 2"
          value={score2}
          onChange={(event) => setScore2(event.target.value)}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create Game
        </Button>
      </form>
    </div>
  );
}
