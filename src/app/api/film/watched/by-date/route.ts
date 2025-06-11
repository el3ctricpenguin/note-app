import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { GroupedFilms } from "@/types";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const watchedFilms = await prisma.watchedFilm.findMany({ orderBy: { watchedDate: "desc" } });
    const groupedByDate = watchedFilms.reduce((acc: GroupedFilms, film) => {
        const date = dayjs(film.watchedDate).format("YYYY-MM-DD");
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(film);
        return acc;
    }, {} as GroupedFilms);
    return NextResponse.json(groupedByDate);
}
