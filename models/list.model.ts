import { MovieDto } from "./movie.model.ts";

export interface ListDto {
  id: string;
  name: string;
  memberId: string;
  movies: Partial<MovieDto>[];
}
