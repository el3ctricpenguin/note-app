import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, WatchedFilm } from "@prisma/client";
import dayjs from "dayjs";
import { GroupedFilms } from "@/types";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const watchedFilms: WatchedFilm[] = await prisma.watchedFilm.findMany({ orderBy: { watchedDate: "desc" } });
            const groupedByDate = watchedFilms.reduce((acc: GroupedFilms, film) => {
                const date = dayjs(film.watchedDate).format("YYYY-MM-DD");
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(film);
                return acc;
            }, {});
            res.json(groupedByDate);
            break;
    }
}
