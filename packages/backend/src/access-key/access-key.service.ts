import { randomBytes } from "crypto";
import { AccessKey } from "@/entities/access-key.entity";
import { User } from "@/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccessKeyDto } from "./dtos/CreateAccessKey.dto";

@Injectable()
export class AccessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private accessKeyRepository: Repository<AccessKey>,
  ) {}

  async listForUser(user: User) {
    const accessKeys = await this.accessKeyRepository.find({
      where: { user: { id: user.id } },
    });

    return accessKeys;
  }

  async createByUser(
    user: User,
    createAccessKeyDto: CreateAccessKeyDto,
  ): Promise<AccessKey> {
    const newAccessKey = this.accessKeyRepository.create({
      user,
      label: createAccessKeyDto.label,
      key: randomBytes(18).toString("hex"),
    });

    const accessKey = await this.accessKeyRepository.save(newAccessKey);

    return accessKey;
  }

  async deleteByUser(user: User, key: string): Promise<void> {
    const result = await this.accessKeyRepository.delete({
      user: { id: user.id },
      key,
    });

    if (result.affected === 0) {
      throw new Error("Access key not found");
    }
  }

  async verifyKey(key: string): Promise<User> {
    const accessKey = await this.accessKeyRepository.findOne({
      where: { key },
      relations: ["user"],
    });

    if (!accessKey) {
      throw new Error("Access key not found");
    }

    return accessKey.user;
  }
}
