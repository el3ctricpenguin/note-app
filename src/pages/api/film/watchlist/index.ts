import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Watchlist } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const watchlistFilms: Watchlist[] = await prisma.watchlist.findMany({ orderBy: { createdAt: "desc" } });
            res.json(watchlistFilms);
            break;
        case "POST":
            try {
                const { filmId, recommendedBy, note, isWatched } = req.body;
                const watchlistFilm: Watchlist = await prisma.watchlist.create({
                    data: {
                        filmId,
                        recommendedBy,
                        note,
                        isWatched,
                    },
                });
                res.status(201).json(watchlistFilm);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to create record" });
            }
            break;
    }
}
