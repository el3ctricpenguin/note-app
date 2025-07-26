import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  withErrorHandling,
  createSuccessResponse,
  validateRequest,
} from "@/lib/api";
import { watchlistSchema } from "@/lib/validation";

export async function GET() {
  return withErrorHandling(async () => {
    const watchlistFilms = await prisma.watchlist.findMany({
      orderBy: { createdAt: "desc" },
    });
    return createSuccessResponse(watchlistFilms);
  });
}

export async function POST(req: NextRequest) {
  return withErrorHandling(async () => {
    const { filmId, recommendedBy, note, isWatched } = await validateRequest(
      req,
      watchlistSchema,
    );
    const watchlistFilm = await prisma.watchlist.create({
      data: {
        filmId,
        recommendedBy,
        note,
        isWatched,
      },
    });
    return createSuccessResponse(watchlistFilm, 201);
  });
}
