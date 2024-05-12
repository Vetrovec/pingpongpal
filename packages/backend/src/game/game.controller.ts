import { AuthUser } from "@/auth/decorators/user.decorator";
import { User } from "@/entities/user.entity";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { JWTAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { IListGamesResponse } from "@pingpongpal/shared";

@UseGuards(JWTAuthGuard)
@Controller("games")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async list(@AuthUser() user: User): Promise<IListGamesResponse> {
    const games = await this.gameService.listForUser(user);
    return { games };
  }

  @Get("count")
  async count(@AuthUser() user: User): Promise<IListGamesResponse> {
    const games = await this.gameService.listUsersAndGames(user);
    return { games };
  }

  @Get("leaderboard")
  async leaderboard(@AuthUser() user: User): Promise<IListGamesResponse> {
    const games = await this.gameService.listLeaderboard(user);
    return { games };
  }
}
