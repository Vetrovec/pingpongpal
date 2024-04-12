import { IGetStatusResponse } from "@pingpongpal/shared";
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/status")
  getStatus(): IGetStatusResponse {
    return { status: this.appService.getStatus() };
  }
}
