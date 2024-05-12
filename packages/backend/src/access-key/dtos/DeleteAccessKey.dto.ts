import { IDeleteAccessKeyRequest } from "@pingpongpal/shared";
import { IsString, Length } from "class-validator";

export class DeleteAccessKeyDto implements IDeleteAccessKeyRequest {
  @IsString()
  @Length(1, 36)
  key: string;
}
