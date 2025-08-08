import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, validateRequest, createUnauthorizedResponse } from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";
import { watchlistSchema } from "@/lib/validation";

export async function GET() {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchlistFilms = await prisma.watchlist.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        });
        return createSuccessResponse(watchlistFilms);
    });
}

export async function POST(req: NextRequest) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const { filmId, recommendedBy, note, isWatched } = await validateRequest(req, watchlistSchema);
        const watchlistFilm = await prisma.watchlist.create({
            data: {
                filmId,
                recommendedBy,
                note,
                isWatched,
                userId: user.id,
            },
        });
        return createSuccessResponse(watchlistFilm, 201);
    });
}
