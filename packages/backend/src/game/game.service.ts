import { Game } from "@/entities/game.entity";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGameDto } from "./dtos/CreateGame.dto";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async listForUser(user: User) {
    const games = await this.gameRepository.find({
      where: { user: { id: user.id } },
    });

    return games;
  }

  async createByUser(user: User, createGameDto: CreateGameDto): Promise<Game> {
    const newGame = this.gameRepository.create({
      user,
      displayName1: createGameDto.displayName1,
      displayName2: createGameDto.displayName2,
      score1: createGameDto.score1,
      score2: createGameDto.score2,
    });

    const game = await this.gameRepository.save(newGame);

    return game;
  }
}
