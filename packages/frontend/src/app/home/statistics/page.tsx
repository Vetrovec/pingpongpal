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

export default function Home() {
  const { data } = useSWR<IGetStatisticsResponse>(
    "/api/v1/statistics",
    fetcher,
  );

  const gameCountData = {
    labels: data?.count.map((row) => row.nickname),
    datasets: [
      {
        data: data?.count.map((row) => parseInt(row.gameCount, 10)),
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

  const totalWinsData = {
    labels: data?.leaderboard.map((row) => row.nickname),
    datasets: [
      {
        label: "Total Wins",

        data: data?.leaderboard.map((row) => parseInt(row.totalWins)),
        backgroundColor: data?.leaderboard.map((_, index) => {
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
    <>
      <div className="flex flex-col gap-4 border border-border p-4 bg-secondary">
        <h2 className="text-xl font-bold text-main">Games played</h2>
        <table className="w-full border border-border">
          <thead>
            <tr className="text-main">
              <th className="border border-border p-2 w-1/2">Player</th>
              <th className="border border-border p-2 w-1/2">Count</th>
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
              <th className="border border-border p-2 w-1/2">Player</th>
              <th className="border border-border p-2 w-1/2">Wins</th>
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

      <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
        <h2 className="text-xl font-bold text-main">Temperatures</h2>
        <table className="w-full border border-border">
          <thead>
            <tr className="text-main">
              <th className="border border-border p-2 w-1/2">
                Temperature type
              </th>
              <th className="border border-border p-2 w-1/2">Temperature</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">Average temperature</td>
              {data?.temperatures.map((row: any, i: number) => (
                <td key={i} className="border border-border p-2">
                  {roundToTwoDecimals(row.averageTemp)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-border p-2">Highest temperature</td>
              {data?.temperatures.map((row: any, i: number) => (
                <td key={i} className="border border-border p-2">
                  {roundToTwoDecimals(row.highestTemp)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-border p-2">Lowest temperature</td>
              {data?.temperatures.map((row: any, i: number) => (
                <td key={i} className="border border-border p-2">
                  {roundToTwoDecimals(row.lowestTemp)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
        <h2 className="text-xl font-bold text-main">Win/Loss Ratio</h2>
        <table className="w-full border border-border">
          <thead>
            <tr className="text-main">
              <th className="border border-border p-2 w-1/4">Player</th>
              <th className="border border-border p-2 w-1/4">Wins</th>
              <th className="border border-border p-2 w-1/4">Losses</th>
              <th className="border border-border p-2 w-1/4">Ratio</th>
            </tr>
          </thead>
          <tbody>
            {data?.leaderboard.map((row: any, i: number) => (
              <tr key={i}>
                <td className="border border-border p-2">{row.nickname}</td>
                <td className="border border-border p-2">{row.totalWins}</td>
                <td className="border border-border p-2">{row.totalLosses}</td>
                <td className="border border-border p-2">
                  {roundToTwoDecimals(row.winLossRatio) + "%"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
        <h2 className="text-xl font-bold text-main">Games played</h2>
        <div className="w-full mx-auto" style={{ maxWidth: "300px" }}>
          <Pie data={gameCountData} />
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
        <h2 className="text-xl font-bold text-main">Users by total wins</h2>
        <div className="w-full mx-auto" style={{ maxWidth: "500px" }}>
          <Bar data={totalWinsData} />
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-border p-4 mt-1 bg-secondary">
        <h2 className="text-xl font-bold text-main">Temperatures</h2>
        <div className="w-full mx-auto" style={{ maxWidth: "500px" }}>
          <Bar data={temperatureData} />
        </div>
      </div>
    </>
  );
}
