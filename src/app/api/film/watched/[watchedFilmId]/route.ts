import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  withErrorHandling,
  createSuccessResponse,
  validateRequest,
} from "@/lib/api";
import { updateWatchedFilmSchema } from "@/lib/validation";
import { WatchedFilm } from "@prisma/client";

type Params = {
  params: {
    watchedFilmId: string;
  };
};

export async function GET(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const { watchedFilmId } = params;
    const watchedFilm: WatchedFilm | null = await prisma.watchedFilm.findUnique(
      { where: { id: Number(watchedFilmId) } },
    );
    return createSuccessResponse(watchedFilm);
  });
}

export async function PUT(request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const { watchedFilmId } = params;
    const updateData = await validateRequest(request, updateWatchedFilmSchema);

    const watchedFilm: WatchedFilm = await prisma.watchedFilm.update({
      where: { id: Number(watchedFilmId) },
      data: updateData,
    });
    return createSuccessResponse(watchedFilm);
  });
}
