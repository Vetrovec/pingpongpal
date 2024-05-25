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

  async listForUser(user: User, skip = 0, take = 10) {
    const gamesAndCount = await this.gameRepository.findAndCount({
      where: { user: { id: user.id } },
      order: { createdAt: "DESC" },
      skip,
      take,
    });

    return gamesAndCount;
  }
}
