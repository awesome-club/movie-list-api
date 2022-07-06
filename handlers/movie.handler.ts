import { Context } from "../deps.ts";
import * as movieService from "../services/movie.service.ts";

export async function search(ctx: Context) {
  const key = ctx.request.url.searchParams.get("key") ?? "";
  ctx.response.body = await movieService.searchMovie(key);
}
