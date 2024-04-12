import { AuthUser } from "@/auth/decorators/user.decorator";
import { User } from "@/entities/user.entity";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateGameDto } from "./dtos/CreateGame.dto";
import { GameService } from "./game.service";
import { JWTAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ICreateGameResponse, IListGamesResponse } from "@pingpongpal/shared";

@UseGuards(JWTAuthGuard)
@Controller("games")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async list(@AuthUser() user: User): Promise<IListGamesResponse> {
    const games = await this.gameService.listForUser(user);
    return { games };
  }

  @Post()
  async create(
    @AuthUser() user: User,
    @Body() createGameDto: CreateGameDto,
  ): Promise<ICreateGameResponse> {
    const game = await this.gameService.createByUser(user, createGameDto);
    return { game };
  }
}
