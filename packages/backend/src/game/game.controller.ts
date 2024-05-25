import { AuthUser } from "@/auth/decorators/user.decorator";
import { User } from "@/entities/user.entity";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { JWTAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { IListGamesResponse } from "@pingpongpal/shared";
import { ListGamesDto } from "./dtos/ListGames.dto";

@UseGuards(JWTAuthGuard)
@Controller("games")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async list(
    @AuthUser() user: User,
    @Query() query: ListGamesDto,
  ): Promise<IListGamesResponse> {
    const [games, totalCount] = await this.gameService.listForUser(
      user,
      query.skip,
      query.take,
    );

    return { games, totalCount };
  }
}
