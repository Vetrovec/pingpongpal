"use client";

import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { IGetStatisticsResponse } from "@pingpongpal/shared";
import Table from "@/components/Table";
import Tile from "@/components/Tile";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
);

ChartJS.defaults.color = "white";

export default function Statistics() {
  const { data } = useSWR<IGetStatisticsResponse>(
    "/api/v1/statistics",
    fetcher,
  );

  const chartOptions = {
    responsive: true,
    aspectRatio: 3,
  };

  const topGameCount = data?.count
    .map((row) => ({
      nickname: row.nickname,
      gameCount: parseInt(row.gameCount, 10),
    }))
    .toSorted((a, b) => b.gameCount - a.gameCount)
    .slice(0, 10);
  const gameCountData = {
    labels: topGameCount?.map((row) => row.nickname),
    datasets: [
      {
        data: topGameCount?.map((row) => row.gameCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topTotalWins = data?.leaderboard
    .map((row) => ({
      nickname: row.nickname,
      totalWins: parseInt(row.totalWins, 10),
    }))
    .toSorted((a, b) => b.totalWins - a.totalWins)
    .slice(0, 10);
  const totalWinsData = {
    labels: topTotalWins?.map((row) => row.nickname),
    datasets: [
      {
        label: "Total Wins",

        data: topTotalWins?.map((row) => row.totalWins),
        backgroundColor: topTotalWins?.map((_, index) => {
          const colors = [
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ];
          return colors[index % colors.length];
        }),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const temperatures = data?.temperatures[0];

  const temperatureData = {
    labels: ["Average", "Highest", "Lowest"],
    datasets: [
      {
        label: "Temperature",
        data: temperatures
          ? [
              parseFloat(temperatures.averageTemp),
              parseFloat(temperatures.highestTemp),
              parseFloat(temperatures.lowestTemp),
            ]
          : [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Helper function to round a number to two decimal places
  const roundToTwoDecimals = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return numValue.toFixed(2);
    }
    return value;
  };

  return (
    <div className="flex flex-col gap-1">
      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Games played</h2>
        <Table
          columns={["Player", "Count"]}
          rows={data?.count.map((row) => [row.nickname, row.gameCount])}
        />
      </Tile>

      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Total wins</h2>
        <Table
          columns={["Player", "Wins"]}
          rows={data?.leaderboard.map((row) => [row.nickname, row.totalWins])}
        />
      </Tile>

      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Temperatures</h2>
        <Table
          columns={["Temperature type", "Temperature"]}
          rows={[
            [
              "Average temperature",
              roundToTwoDecimals(temperatures?.averageTemp ?? ""),
            ],
            [
              "Highest temperature",
              roundToTwoDecimals(temperatures?.highestTemp ?? ""),
            ],
            [
              "Lowest temperature",
              roundToTwoDecimals(temperatures?.lowestTemp ?? ""),
            ],
          ]}
        />
      </Tile>

      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Win/Loss Ratio</h2>
        <Table
          columns={["Player", "Wins", "Losses", "Ratio"]}
          rows={data?.leaderboard.map((row) => [
            row.nickname,
            row.totalWins,
            row.totalLosses,
            roundToTwoDecimals(row.winLossRatio) + "%",
          ])}
        />
      </Tile>

      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Games played</h2>
        <div className="mx-auto" style={{ maxHeight: "300px" }}>
          <Pie data={gameCountData} />
        </div>
      </Tile>

      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Users by total wins</h2>
        <div>
          <Bar options={chartOptions} data={totalWinsData} />
        </div>
      </Tile>

      <Tile className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-main">Temperatures</h2>
        <div>
          <Bar options={chartOptions} data={temperatureData} />
        </div>
      </Tile>
    </div>
  );
}
