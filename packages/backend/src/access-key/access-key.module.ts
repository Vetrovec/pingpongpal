import { Module } from "@nestjs/common";
import { AccessKeyController } from "./access-key.controller";
import { AccessKeyService } from "./access-key.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessKey } from "@/entities/access-key.entity";
import { User } from "@/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey, User])],
  controllers: [AccessKeyController],
  providers: [AccessKeyService],
  exports: [AccessKeyService],
})
export class AccessKeyModule {}
