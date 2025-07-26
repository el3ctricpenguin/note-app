import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";

export async function GET(_req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const { watchlistId } = params;
        const watchlistFilm = await prisma.watchlist.findUnique({ where: { id: Number(watchlistId) } });
        return createSuccessResponse(watchlistFilm);
    });
}

export async function PUT(req: NextRequest, { params }: { params: { watchlistId: string } }) {
    return withErrorHandling(async () => {
        const { watchlistId } = params;
        const { recommendedBy, note, isWatched } = await req.json();
        const updated = await prisma.watchlist.update({
            where: { id: Number(watchlistId) },
            data: { recommendedBy, note, isWatched },
        });
        return createSuccessResponse(updated);
    });
}
