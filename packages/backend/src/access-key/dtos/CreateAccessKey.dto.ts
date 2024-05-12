import { ICreateAccessKeyRequest } from "@pingpongpal/shared";
import { IsString, Length } from "class-validator";

export class CreateAccessKeyDto implements ICreateAccessKeyRequest {
  @IsString()
  @Length(1, 128)
  label: string;
}
