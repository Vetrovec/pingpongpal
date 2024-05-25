import { Game } from "@/entities/game.entity";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async listForUser(user: User) {
    const games = await this.gameRepository.find({
      where: { user: { id: user.id } },
    });

    return games;
  }
}
