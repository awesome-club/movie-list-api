import { Router } from "./deps.ts";
import * as SetupHandler from "./handlers/setup.handler.ts";
import * as HomeHandler from "./handlers/home.handler.ts";
import * as MovieHandler from "./handlers/movie.handler.ts";
import * as ListsHandler from "./handlers/list.handler.ts";

const Routes = new Router()
  // Home
  .get("/", HomeHandler.home)
  // Setup
  .get("/init", SetupHandler.init)
  // Movies
  .get("/movies/search", MovieHandler.search)
  //Lists
  .post("/lists", ListsHandler.create)
  .delete("/lists/:listId", ListsHandler.remove)
  .get("/lists/:listId", ListsHandler.get)
  .put("/lists/:listId/movies/:movieId", ListsHandler.addMovie)
  .delete("/lists/:listId/movies/:movieId", ListsHandler.removeMovie);

export default Routes;
