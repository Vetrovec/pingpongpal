"use client";

import FormattedDate from "@/components/FormattedDate";
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

  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Display Name 1</th>
            <th>Display Name 2</th>
            <th>Score 1</th>
            <th>Score 2</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={6}>Error: {error.message}</td>
            </tr>
          )}
          {data?.games.map((game, index) => (
            <tr key={game.id}>
              <td>{index + 1}</td>
              <td>{game.displayName1}</td>
              <td>{game.displayName2}</td>
              <td>{game.score1}</td>
              <td>{game.score2}</td>
              <td>
                <FormattedDate date={new Date(game.createdAt)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <label>
          Display Name 1:
          <input
            type="text"
            value={displayName1}
            onChange={(event) => setDisplayName1(event.target.value)}
          />
        </label>
        <label>
          Display Name 2:
          <input
            type="text"
            value={displayName2}
            onChange={(event) => setDisplayName2(event.target.value)}
          />
        </label>
        <label>
          Score 1:
          <input
            type="number"
            value={score1}
            onChange={(event) => setScore1(event.target.value)}
          />
        </label>
        <label>
          Score 2:
          <input
            type="number"
            value={score2}
            onChange={(event) => setScore2(event.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={() =>
            trigger({
              displayName1,
              displayName2,
              score1: parseInt(score1, 10),
              score2: parseInt(score2, 10),
            })
          }
        >
          Create Game
        </button>
      </form>
    </div>
  );
}
