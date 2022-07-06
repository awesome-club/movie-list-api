import { Context } from "../deps.ts";

export async function home(context: Context) {
  await context.send({
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
}
