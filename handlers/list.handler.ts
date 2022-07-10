import { Context, helpers, Status } from "../deps.ts";
import * as ListService from "../services/list.service.ts";
import * as MovieService from "../services/movie.service.ts";
import { mid } from "../services/request.service.ts";
import { ListDto } from "../models/list.model.ts";

const { getQuery } = helpers;

async function fetchWithPermission(
  ctx: Context,
  listId: string,
): Promise<ListDto | null> {
  const memberId = mid(ctx);
  const list = await ListService.getById(listId);
  if (!list) return null;

  if (!list.isPublic && list.memberId !== memberId) {
    ctx.response.status = Status.NotFound;
    return null;
  }
  return list;
}

export async function create(ctx: Context) {
  const memberId = mid(ctx);
  const body = ctx.request.body();

  if (body.type !== "json" || !memberId) {
    ctx.response.status = Status.BadRequest;
    return;
  }

  try {
    const dto = await body.value;
    console.log("=> create list dto=", JSON.stringify(dto));
    ListService.create(memberId, dto.name, dto.isPublic);

    ctx.response.status = Status.OK;
  } catch (err) {
    ctx.response.status = Status.BadRequest;
    console.error(err);
  }
}

export async function remove(ctx: Context) {
  const { listId } = getQuery(ctx, { mergeParams: true });

  if (!await fetchWithPermission(ctx, listId)) {
    return;
  }

  ListService.remove(listId);
  ctx.response.status = Status.OK;
}

export async function get(ctx: Context) {
  const { listId } = getQuery(ctx, { mergeParams: true });

  const list = await fetchWithPermission(ctx, listId);
  if (!list) {
    return;
  }

  ctx.response.body = list;
  ctx.response.status = Status.OK;
}

export async function addMovie(ctx: Context) {
  const { listId, movieId } = getQuery(ctx, { mergeParams: true });
  const list = await fetchWithPermission(ctx, listId);
  if (!list) {
    ctx.response.status = Status.NotFound;
    return null;
  }
  const movie = await MovieService.getMovieDetails(movieId);
  ListService.addMovieToList(list, movie);

  ctx.response.status = Status.OK;
}

export async function removeMovie(ctx: Context) {
  const { listId, movieId } = getQuery(ctx, { mergeParams: true });
  const list = await fetchWithPermission(ctx, listId);
  if (!list) {
    ctx.response.status = Status.NotFound;
    return null;
  }
  ListService.removeMovieFromList(list, parseInt(movieId));

  ctx.response.status = Status.OK;
}
