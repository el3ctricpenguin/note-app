import dayjs from "dayjs";
import { GroupedFilms } from "@/types";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, createUnauthorizedResponse } from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";

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
        const groupedByDate = watchedFilms.reduce((acc: GroupedFilms, film) => {
            const date = dayjs(film.watchedDate).format("YYYY-MM-DD");
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(film);
            return acc;
        }, {} as GroupedFilms);
        return createSuccessResponse(groupedByDate);
    });
}
