import { Context } from "../deps.ts";

export function mid(ctx: Context) {
  return ctx.request.headers.get("X-MID") ?? "";
}
