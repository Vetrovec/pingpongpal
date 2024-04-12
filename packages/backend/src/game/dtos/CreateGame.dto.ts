import { ICreateGameRequest } from "@pingpongpal/shared";
import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateGameDto implements ICreateGameRequest {
  @IsString()
  @Length(1, 128)
  displayName1: string;

  @IsString()
  @Length(1, 128)
  displayName2: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  score1: number;

  @IsInt()
  @Min(0)
  @Max(65535)
  score2: number;
}
