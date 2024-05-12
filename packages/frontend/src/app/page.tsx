"use client";

import Button from "@/components/Button";
import FormattedDate from "@/components/FormattedDate";
import Input from "@/components/Input";
import { fetcher, mutationFetcher } from "@/helpers/fetcher";
import { useUser } from "@/hooks/useUser";
import {
  ICreateAccessKeyRequest,
  IDeleteAccessKeyRequest,
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

  const { trigger: triggerCreateAccessKey } = useSWRMutation(
    "/api/v1/access-keys",
    mutationFetcher<ICreateAccessKeyRequest>("POST", "Create access key"),
    {
      onSuccess: () => {
        setAccessKeyLabel("");
      },
    },
  );

  const { trigger: triggerDeleteAccessKey } = useSWRMutation(
    "/api/v1/access-keys",
    mutationFetcher<IDeleteAccessKeyRequest>("DELETE", "Revoke access key"),
  );

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

      <div className="container p-2 mx-auto">
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

        <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
          <h2 className="text-xl font-bold text-main">Access keys</h2>
          <table className="w-full border border-border">
            <thead>
              <tr className="text-main">
                <th className="border border-border p-2">Label</th>
                <th className="border border-border p-2">Key</th>
                <th className="border border-border p-2">Created At</th>
                <th className="border border-border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accessKeyData?.accessKeys.map((accessKey) => (
                <tr key={accessKey.key}>
                  <td className="border border-border p-2">
                    {accessKey.label}
                  </td>
                  <td className="border border-border p-2">{accessKey.key}</td>
                  <td className="border border-border p-2">
                    <FormattedDate date={new Date(accessKey.createdAt)} />
                  </td>
                  <td className="border border-border p-2">
                    <div className="flex justify-around">
                      <button
                        className="text-center text-red-500"
                        onClick={() =>
                          triggerDeleteAccessKey({ key: accessKey.key })
                        }
                      >
                        Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form
          className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary"
          onSubmit={(event) => {
            event.preventDefault();
            triggerCreateAccessKey({
              label: accessKeyLabel,
            });
          }}
        >
          <h2 className="text-xl font-bold text-main">Create Access key</h2>
          <div className="flex items-center gap-4">
            <Input
              className="flex-grow"
              placeholder="Label"
              value={accessKeyLabel}
              onChange={(event) => setAccessKeyLabel(event.target.value)}
            />
            <Button type="submit" className="px-12 py-2 border-none rounded-lg">
              Create Access key
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
