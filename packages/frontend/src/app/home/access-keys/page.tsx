"use client";

import Button from "@/components/Button";
import FormattedDate from "@/components/FormattedDate";
import Input from "@/components/Input";
import Table from "@/components/Table";
import Tile from "@/components/Tile";
import { fetcher, mutationFetcher } from "@/helpers/fetcher";
import {
  ICreateAccessKeyRequest,
  IDeleteAccessKeyRequest,
  IListAccessKeysResponse,
} from "@pingpongpal/shared";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function AccessKeys() {
  const { data } = useSWR<IListAccessKeysResponse>(
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

  return (
    <div className="flex flex-col gap-1">
      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Access keys</h2>
        <Table
          columns={["Label", "Key", "Created At", "Actions"]}
          rows={data?.accessKeys.map((accessKey, i) => [
            accessKey.label,
            accessKey.key,
            <FormattedDate key={i} date={new Date(accessKey.createdAt)} />,
            <div key={i} className="flex justify-around">
              <button
                className="text-center text-red-500"
                onClick={() => triggerDeleteAccessKey({ key: accessKey.key })}
              >
                Revoke
              </button>
            </div>,
          ])}
        />
      </Tile>

      <Tile>
        <form
          className="flex flex-col gap-4"
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
      </Tile>
    </div>
  );
}
