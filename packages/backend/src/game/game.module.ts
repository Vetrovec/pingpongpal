import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@/entities/game.entity";
import { User } from "@/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Game, User])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
