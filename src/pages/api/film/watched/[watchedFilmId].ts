import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, WatchedFilm } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { watchedFilmId } = req.query;
    switch (req.method) {
        case "GET":
            const watchedFilm: WatchedFilm | null = await prisma.watchedFilm.findUnique({ where: { id: Number(watchedFilmId) } });
            res.json(watchedFilm);
            break;
        case "PUT":
            try {
                const { filmId, watchedDate, rating, note } = req.body;
                const watchedFilm: WatchedFilm = await prisma.watchedFilm.update({
                    where: {
                        id: Number(watchedFilmId),
                    },
                    data: {
                        filmId,
                        watchedDate,
                        rating,
                        note,
                    },
                });
                res.status(201).json(watchedFilm);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to create record" });
            }
            break;
    }
}
