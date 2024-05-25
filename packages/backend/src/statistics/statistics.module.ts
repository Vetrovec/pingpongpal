import { Module } from "@nestjs/common";
import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@/entities/game.entity";
import { User } from "@/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Game, User])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
