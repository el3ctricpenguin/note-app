import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, WatchedFilm } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const { watchedFilmId } = req.query;
            const watchedFilm: WatchedFilm | null = await prisma.watchedFilm.findUnique({ where: { id: Number(watchedFilmId) } });
            res.json(watchedFilm);
            break;
        // case "POST":
        //     try {
        //         const { filmId, watchedDate, rating, note } = req.body;
        //         const watchedFilm: WatchedFilm = await prisma.watchedFilm.create({
        //             data: {
        //                 filmId,
        //                 watchedDate,
        //                 rating,
        //                 note,
        //             },
        //         });
        //         res.status(201).json(watchedFilm);
        //     } catch (error) {
        //         console.log(error);
        //         res.status(500).json({ error: "Failed to create record" });
        //     }
        //     break;
    }
}
