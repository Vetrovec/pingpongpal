import { Game } from "@/entities/game.entity";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  // users nicknames and their games
  async listUsersAndGames(user: User) {
    const users = await this.gameRepository.query(`
				SELECT nickname, userId, COUNT(*) AS gameCount
				FROM (
					SELECT displayName1 AS nickname, userId FROM game
					UNION ALL
					SELECT displayName2 AS nickname, userId FROM game
				) AS combinedNames
				WHERE nickname IS NOT NULL AND userId = ${user.id}
				GROUP BY nickname
				ORDER BY gameCount DESC
			`);

    return users;
  }

  // users leaderboard
  async listLeaderboard(user: User) {
    const rawQuery = `
    SELECT 
      nickname,
      SUM(winCount) AS totalWins,
      SUM(lossCount) AS totalLosses,
    CASE 
      WHEN SUM(lossCount) = 0 THEN 100
      ELSE (SUM(winCount) * 100.0) / (SUM(winCount) + SUM(lossCount))
    END AS winLossRatio
  FROM (
    SELECT 
      displayName1 AS nickname,
      CASE WHEN score1 > score2 THEN 1 ELSE 0 END AS winCount,
      CASE WHEN score1 < score2 THEN 1 ELSE 0 END AS lossCount
    FROM game
    WHERE userId = ${user.id}
    UNION ALL
    SELECT displayName2 AS nickname,
      CASE WHEN score2 > score1 THEN 1 ELSE 0 END AS winCount,
      CASE WHEN score2 < score1 THEN 1 ELSE 0 END AS lossCount
    FROM game
    WHERE userId = ${user.id}
  ) AS combinedResults
  GROUP BY nickname
  ORDER BY totalWins DESC
    `;

    return this.gameRepository.query(rawQuery); // Execute raw SQL directly
  }

  async listTemperatures(user: User) {
    const temperatures = await this.gameRepository.query(`
		SELECT AVG(temperature) AS averageTemp, MAX(temperature) AS highestTemp, MIN(temperature) AS lowestTemp
		FROM game
		WHERE userId = ${user.id}
	`);

    return temperatures;
  }
}
