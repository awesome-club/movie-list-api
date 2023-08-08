import { Context } from "../deps.ts";
import * as movieService from "../services/movie.service.ts";

export async function search(ctx: Context) {
  const key = ctx.request.url.searchParams.get("key") ?? "";
  ctx.response.body = await movieService.searchMovie(key);
}


export async function details(ctx: Context) {
  const id = ctx.request.url.searchParams.get("id") ?? "";
  ctx.response.body = await movieService.getMovieDetails(id);
}
