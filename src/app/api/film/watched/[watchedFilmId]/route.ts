import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";
import { WatchedFilm } from "@prisma/client";

type Params = {
    params: {
        watchedFilmId: string;
    };
};

export async function GET(_request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const { watchedFilmId } = params;
        const watchedFilm: WatchedFilm | null = await prisma.watchedFilm.findUnique({ where: { id: Number(watchedFilmId) } });
        return createSuccessResponse(watchedFilm);
    });
}

export async function PUT(request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const { watchedFilmId } = params;
        const { filmId, watchedDate, rating, note } = await request.json();

        const watchedFilm: WatchedFilm = await prisma.watchedFilm.update({
            where: { id: Number(watchedFilmId) },
            data: { filmId, watchedDate, rating, note },
        });
        return createSuccessResponse(watchedFilm);
    });
}
