import { Context } from "../deps.ts";
import { uuid } from "../services/id.service.ts";
import * as ListService from "../services/list.service.ts";

export function init({ request, response }: Context) {
  const id = request.headers.get("X-MID") || uuid();
  const lists = id ? ListService.getForMember(id) : [];
  response.body = { id, lists };
}
