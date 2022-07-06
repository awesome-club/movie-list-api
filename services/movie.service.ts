import * as env from "../env.ts";
import { MovieDto, toMovieDto } from "../models/movie.model.ts";

const SearchPath = `${env.MovieDbPath}/search/movie?api_key=${env.MovieDbKey}`;
const DetailsPath = (id: string) =>
  `${env.MovieDbPath}/movie/${id}?api_key=${env.MovieDbKey}`;

export async function searchMovie(key: string): Promise<MovieDto[]> {
  const resp = await fetch(`${SearchPath}&query=${key}`);
  const data = await resp.json();
  return data["results"].map(toMovieDto);
}

export async function getMovieDetails(id: string): Promise<MovieDto> {
  const resp = await fetch(DetailsPath(id));
  const data = await resp.json();
  return toMovieDto(data);
}
