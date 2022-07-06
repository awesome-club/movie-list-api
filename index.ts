import { Application, oakCors } from "./deps.ts";
import { initDb } from "./db.ts";
import Routes from "./routes.ts";

initDb();
const app = new Application();

app.use(oakCors());
app.use(Routes.routes());
app.use(Routes.allowedMethods());

await app.listen({ port: 8000 });
