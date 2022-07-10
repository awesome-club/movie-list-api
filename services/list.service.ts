import type { Row } from "../deps.ts";
import { ListDto } from "../models/list.model.ts";
import { MovieDto } from "../models/movie.model.ts";
import { DbInstance } from "../db.ts";
import { randomId } from "./id.service.ts";

const Querries = {
  FindById:
    "SELECT list_id, list_name, member_id, is_public, movies FROM movie_list WHERE list_id = ? LIMIT 1",
  FindByMemberId:
    "SELECT list_id, list_name, member_id, is_public, movies FROM movie_list WHERE member_id = ?",
  DeleteListById: "DELETE FROM movie_list WHERE list_id = ?",
  InsertList:
    "INSERT INTO movie_list (member_id, list_id, list_name, is_public, movies) VALUES (?,?,?,?,?)",
  UpdateListMovies: "UPDATE movie_list SET movies = ? where list_id = ?",
};

export function create(
  memberId: string,
  name: string,
  isPublic: boolean,
): ListDto {
  const dto = {
    id: randomId(),
    name,
    memberId,
    isPublic,
    movies: [],
  } as ListDto;
  console.log("=> insert list", JSON.stringify(dto));

  DbInstance.query(Querries.InsertList, [
    memberId,
    dto.id,
    name,
    isPublic,
    "[]",
  ]);

  return dto;
}

export function remove(listId: string) {
  DbInstance.query(Querries.DeleteListById, [listId]);
}

export function getById(id: string): ListDto | null {
  const results = DbInstance.query(Querries.FindById, [id]);
  if (results.length === 0) {
    return null;
  }

  return getListFromRow(results[0]);
}

export function getForMember(memberId: string): ListDto[] {
  const results = DbInstance.query(Querries.FindByMemberId, [memberId]);
  if (results.length === 0) {
    return [];
  }

  return results.map(getListFromRow);
}

export function addMovieToList(list: ListDto, movie: MovieDto) {
  if (!list.movies.find((it) => it.id === movie.id)) {
    list.movies = [
      { id: movie.id, poster: movie.poster, title: movie.title },
      ...list.movies,
    ];

    DbInstance.query(Querries.UpdateListMovies, [
      JSON.stringify(list.movies),
      list.id,
    ]);
  }
}

export function removeMovieFromList(list: ListDto, movieId: number) {
  list.movies = list.movies.filter((it) => it.id !== movieId);
  DbInstance.query(Querries.UpdateListMovies, [
    JSON.stringify(list.movies),
    list.id,
  ]);
}

function getListFromRow(result: Row) {
  console.log("=> get list from row: ", JSON.stringify(result));
  const [listId, listName, memberId, isPublic, movies] = result;

  return {
    id: listId as string,
    name: listName as string,
    memberId: memberId as string,
    isPublic: isPublic as boolean,
    movies: JSON.parse(movies as string),
  };
}
