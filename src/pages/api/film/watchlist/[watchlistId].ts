import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Watchlist } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const { watchlistId } = req.query;
            const watchlistFilm: Watchlist | null = await prisma.watchlist.findUnique({ where: { id: Number(watchlistId) } });
            res.json(watchlistFilm);
            break;
    }
}
