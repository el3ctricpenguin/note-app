import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, validateRequest, createUnauthorizedResponse } from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";
import { watchedFilmSchema } from "@/lib/validation";
import { NextRequest } from "next/server";

export async function GET() {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchedFilms = await prisma.watchedFilm.findMany({
            where: { userId: user.id },
            orderBy: { watchedDate: "desc" },
        });
        return createSuccessResponse(watchedFilms);
    });
}

export async function POST(req: NextRequest) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const { filmId, watchedDate, rating, note } = await validateRequest(req, watchedFilmSchema);
        const normalizedWatchedDate = new Date(watchedDate + 'T00:00:00Z').toISOString();
        const watchedFilm = await prisma.watchedFilm.create({
            data: {
                filmId,
                watchedDate: normalizedWatchedDate,
                rating,
                note,
                userId: user.id,
            },
        });
        return createSuccessResponse(watchedFilm, 201);
    });
}
