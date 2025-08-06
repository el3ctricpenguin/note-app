import dayjs from "dayjs";
import { GroupedFilms } from "@/types";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";

export async function GET() {
    return withErrorHandling(async () => {
        const watchedFilms = await prisma.watchedFilm.findMany({
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
