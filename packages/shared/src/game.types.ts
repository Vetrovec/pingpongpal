export interface IGame {
  id: number;
  displayName1: string;
  displayName2: string;
  score1: number;
  score2: number;
  temperature: number;
  createdAt: Date;
}

export interface IListGamesResponse {
  games: IGame[];
  totalCount: number;
}

export interface ICreateGameRequest {
  displayName1: string;
  displayName2: string;
  score1: number;
  score2: number;
}

export interface ICreateGameResponse {
  game: IGame;
}
