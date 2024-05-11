import { Module } from "@nestjs/common";
import { IotService } from "./iot.service";
import { IotController } from "./iot.controller";
import { AccessKeyModule } from "@/access-key/access-key.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "@/entities/game.entity";
import { User } from "@/entities/user.entity";

@Module({
  imports: [AccessKeyModule, TypeOrmModule.forFeature([Game, User])],
  providers: [IotService],
  controllers: [IotController],
})
export class IotModule {}
