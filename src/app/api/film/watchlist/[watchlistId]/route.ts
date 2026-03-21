import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import {
    withErrorHandling,
    createSuccessResponse,
    validateRequest,
    parseId,
    createUnauthorizedResponse,
    createNotFoundResponse,
} from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";
import { updateWatchlistSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchlistId = parseId(params.watchlistId);
        const watchlistFilm = await prisma.watchlist.findFirst({
            where: { id: watchlistId, userId: user.id },
        });

        if (!watchlistFilm) {
            return createNotFoundResponse("Watchlist");
        }

        return createSuccessResponse(watchlistFilm);
    });
}

export async function DELETE(_req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchlistId = parseId(params.watchlistId);
        const watchlistFilm = await prisma.watchlist.findFirst({
            where: { id: watchlistId, userId: user.id },
        });

        if (!watchlistFilm) {
            return createNotFoundResponse("Watchlist");
        }

        await prisma.watchlist.delete({
            where: { id: watchlistId },
        });

        return createSuccessResponse({ message: "Deleted successfully" });
    });
}

export async function PUT(req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchlistId = parseId(params.watchlistId);
        const watchlistFilm = await prisma.watchlist.findFirst({
            where: { id: watchlistId, userId: user.id },
        });

        if (!watchlistFilm) {
            return createNotFoundResponse("Watchlist");
        }

        const updateData = await validateRequest(req, updateWatchlistSchema);
        const updated = await prisma.watchlist.update({
            where: { id: watchlistId },
            data: updateData,
        });
        return createSuccessResponse(updated, 201);
    });
}
