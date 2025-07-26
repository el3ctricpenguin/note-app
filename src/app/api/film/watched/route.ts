import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";
import { NextRequest } from "next/server";

export async function GET() {
    return withErrorHandling(async () => {
        const watchedFilms = await prisma.watchedFilm.findMany({ orderBy: { watchedDate: "desc" } });
        return createSuccessResponse(watchedFilms);
    });
}

export async function POST(req: NextRequest) {
    return withErrorHandling(async () => {
        const { filmId, watchedDate, rating, note } = await req.json();
        const watchedFilm = await prisma.watchedFilm.create({
            data: {
                filmId,
                watchedDate,
                rating,
                note,
            },
        });
        return createSuccessResponse(watchedFilm, 201);
    });
}
