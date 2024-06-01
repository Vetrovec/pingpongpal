export interface IStatisticsCountRow {
  gameCount: string;
  nickname: string;
  userId: string;
}

export interface IStatisticsLeaderboardRow {
  nickname: string;
  totalLosses: string;
  totalWins: string;
  winLossRatio: string;
}

export interface IStatisticsTemperatureRow {
  averageTemp: string;
  highestTemp: string;
  lowestTemp: string;
}

export interface IGetStatisticsResponse {
  count: IStatisticsCountRow[];
  leaderboard: IStatisticsLeaderboardRow[];
  temperatures: IStatisticsTemperatureRow[];
}
