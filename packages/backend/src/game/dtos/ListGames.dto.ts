import { IsInt, IsOptional, Max, Min } from "class-validator";

export class ListGamesDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  take: number;
}
