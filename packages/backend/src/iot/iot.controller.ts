import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AccessKeyAuthGuard } from "./guards/access-key-auth.guard";
import { AuthUser } from "@/auth/decorators/user.decorator";
import { User } from "@/entities/user.entity";
import { CreateGameDto } from "./dtos/CreateGame.dto";
import { IotService } from "./iot.service";

@UseGuards(AccessKeyAuthGuard)
@Controller("iot")
export class IotController {
  constructor(private iotService: IotService) {}

  @Post("games")
  async createGame(
    @AuthUser() user: User,
    @Body() createGameDto: CreateGameDto,
  ) {
    const game = await this.iotService.createByUser(user, createGameDto);
    return { game };
  }
}
