import { AuthUser } from "@/auth/decorators/user.decorator";
import { User } from "@/entities/user.entity";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { StatisticsService } from "./statistics.service";

@UseGuards(JWTAuthGuard)
@Controller("statistics")
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  async getStatistics(@AuthUser() user: User): Promise<any> {
    const count = await this.statisticsService.listUsersAndGames(user);
    const leaderboard = await this.statisticsService.listLeaderboard(user);

    return { count, leaderboard };
  }
}
