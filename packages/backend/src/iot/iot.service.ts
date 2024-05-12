import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dtos/CreateGame.dto";
import { Game } from "@/entities/game.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class IotService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async createByUser(user: User, createGameDto: CreateGameDto): Promise<Game> {
    const newGame = this.gameRepository.create({
      user,
      payloadId: createGameDto.payloadId,
      displayName1: createGameDto.displayName1,
      displayName2: createGameDto.displayName2,
      score1: createGameDto.score1,
      score2: createGameDto.score2,
      temperature: createGameDto.temperature,
    });

    const game = await this.gameRepository.save(newGame);

    return game;
  }
}
