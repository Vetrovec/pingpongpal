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
			SELECT nickname, SUM(winCount) AS totalWins 
			FROM (
					SELECT wins.nickname AS nickname, wins.winCount AS winCount 
					FROM (
							SELECT game.displayName1 AS nickname, COUNT(game.id) AS winCount 
							FROM game 
							WHERE game.userId = ${user.id}
							GROUP BY game.displayName1
							UNION ALL 
							SELECT game.displayName2 AS nickname, COUNT(game.id) AS winCount 
							FROM game 
							WHERE game.userId = ${user.id}
							GROUP BY game.displayName2
					) AS wins
			) AS combinedResults
			GROUP BY nickname 
			ORDER BY totalWins DESC
		`;

    return this.gameRepository.query(rawQuery); // Execute raw SQL directly
  }
}
