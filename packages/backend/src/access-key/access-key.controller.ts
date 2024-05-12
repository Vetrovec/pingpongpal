import { AuthUser } from "@/auth/decorators/user.decorator";
import { User } from "@/entities/user.entity";
import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { AccessKeyService } from "./access-key.service";
import { CreateAccessKeyDto } from "./dtos/CreateAccessKey.dto";
import {
  ICreateAccessKeyResponse,
  IListAccessKeysResponse,
} from "@pingpongpal/shared";
import { DeleteAccessKeyDto } from "./dtos/DeleteAccessKey.dto";

@UseGuards(JWTAuthGuard)
@Controller("access-keys")
export class AccessKeyController {
  constructor(private accessKeyService: AccessKeyService) {}

  @Get()
  async list(@AuthUser() user: User): Promise<IListAccessKeysResponse> {
    const accessKeys = await this.accessKeyService.listForUser(user);
    return { accessKeys };
  }

  @Post()
  async create(
    @AuthUser() user: User,
    @Body() createAccessKey: CreateAccessKeyDto,
  ): Promise<ICreateAccessKeyResponse> {
    const accessKey = await this.accessKeyService.createByUser(
      user,
      createAccessKey,
    );
    return { accessKey };
  }

  @Delete()
  async delete(
    @AuthUser() user: User,
    @Body() deleteAccessKeyDto: DeleteAccessKeyDto,
  ) {
    await this.accessKeyService.deleteByUser(user, deleteAccessKeyDto.key);
    return { success: true };
  }
}
