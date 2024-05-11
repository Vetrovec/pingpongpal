"use client";

import Button from "@/components/Button";
import FormattedDate from "@/components/FormattedDate";
import Input from "@/components/Input";
import { fetcher, mutationFetcher } from "@/helpers/fetcher";
import { useUser } from "@/hooks/useUser";
import {
  ICreateAccessKeyRequest,
  ICreateGameRequest,
  IListAccessKeysResponse,
  IListGamesResponse,
} from "@pingpongpal/shared";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Home() {
  const user = useUser();

  const { data: gameData } = useSWR<IListGamesResponse>(
    "/api/v1/games",
    fetcher,
  );

  const { data: accessKeyData } = useSWR<IListAccessKeysResponse>(
    "/api/v1/access-keys",
    fetcher,
  );

  const [accessKeyLabel, setAccessKeyLabel] = useState("");

  const { trigger } = useSWRMutation(
    "/api/v1/access-keys",
    mutationFetcher<ICreateAccessKeyRequest>("POST", "Create access key"),
    {
      onSuccess: () => {
        setAccessKeyLabel("");
      },
    },
  );

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
            {gameData?.games.map((game) => (
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

      <div className="flex flex-col gap-4 border border-gray-300 p-4 mt-4 bg-white">
        <h2 className="text-xl font-bold">Access keys</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Label</th>
              <th className="border border-gray-300 p-2">Key</th>
              <th className="border border-gray-300 p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {accessKeyData?.accessKeys.map((accessKey) => (
              <tr key={accessKey.key}>
                <td className="border border-gray-300 p-2">
                  {accessKey.label}
                </td>
                <td className="border border-gray-300 p-2">{accessKey.key}</td>
                <td className="border border-gray-300 p-2">
                  <FormattedDate date={new Date(accessKey.createdAt)} />
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
            label: accessKeyLabel,
          });
        }}
      >
        <h2 className="text-xl font-bold">Create Access key</h2>
        <Input
          placeholder="Label"
          value={accessKeyLabel}
          onChange={(event) => setAccessKeyLabel(event.target.value)}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create Access key
        </Button>
      </form>
    </div>
  );
}
