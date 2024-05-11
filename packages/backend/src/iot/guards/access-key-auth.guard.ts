import { AccessKeyService } from "@/access-key/access-key.service";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AccessKeyAuthGuard implements CanActivate {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessKey = this.extractTokenFromHeader(request);

    if (!accessKey) {
      return false;
    }

    const user = await this.accessKeyService.verifyKey(accessKey);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
