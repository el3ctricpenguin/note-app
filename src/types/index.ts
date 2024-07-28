import { WatchedFilm } from "@prisma/client";

export interface GroupedFilms {
    [date: string]: WatchedFilm[];
}
