import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { withErrorHandling, createSuccessResponse, validateRequest, parseId } from "@/lib/api";
import { updateWatchlistSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const watchlistId = parseId(params.watchlistId);
        const watchlistFilm = await prisma.watchlist.findUnique({
            where: { id: watchlistId },
        });
        return createSuccessResponse(watchlistFilm);
    });
}

export async function PUT(req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const watchlistId = parseId(params.watchlistId);
        const updateData = await validateRequest(req, updateWatchlistSchema);
        const updated = await prisma.watchlist.update({
            where: { id: watchlistId },
            data: updateData,
        });
        return createSuccessResponse(updated, 201);
    });
}
