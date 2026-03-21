import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    withErrorHandling,
    createSuccessResponse,
    validateRequest,
    parseId,
    createUnauthorizedResponse,
    createNotFoundResponse,
} from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";
import { updateWatchedFilmSchema } from "@/lib/validation";

type Params = {
    params: {
        watchedFilmId: string;
    };
};

export async function GET(_request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchedFilmId = parseId(params.watchedFilmId);
        const watchedFilm = await prisma.watchedFilm.findFirst({
            where: { id: watchedFilmId, userId: user.id },
        });

        if (!watchedFilm) {
            return createNotFoundResponse("WatchedFilm");
        }

        return createSuccessResponse(watchedFilm);
    });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchedFilmId = parseId(params.watchedFilmId);
        const watchedFilm = await prisma.watchedFilm.findFirst({
            where: { id: watchedFilmId, userId: user.id },
        });

        if (!watchedFilm) {
            return createNotFoundResponse("WatchedFilm");
        }

        await prisma.watchedFilm.delete({
            where: { id: watchedFilmId },
        });

        return createSuccessResponse({ message: "Deleted successfully" });
    });
}

export async function PUT(request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const watchedFilmId = parseId(params.watchedFilmId);
        const watchedFilm = await prisma.watchedFilm.findFirst({
            where: { id: watchedFilmId, userId: user.id },
        });

        if (!watchedFilm) {
            return createNotFoundResponse("WatchedFilm");
        }

        const updateData = await validateRequest(request, updateWatchedFilmSchema);

        // watchedDateがある場合は正規化
        if (updateData.watchedDate) {
            updateData.watchedDate = new Date(updateData.watchedDate + "T00:00:00Z").toISOString();
        }

        const updatedWatchedFilm = await prisma.watchedFilm.update({
            where: { id: watchedFilmId },
            data: updateData,
        });
        return createSuccessResponse(updatedWatchedFilm, 201);
    });
}
