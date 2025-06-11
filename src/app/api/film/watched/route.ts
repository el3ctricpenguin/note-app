import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const watchedFilms = await prisma.watchedFilm.findMany({ orderBy: { watchedDate: "desc" } });
    return NextResponse.json(watchedFilms);
}

export async function POST(req: NextRequest) {
    try {
        const { filmId, watchedDate, rating, note } = await req.json();
        const watchedFilm = await prisma.watchedFilm.create({
            data: {
                filmId,
                watchedDate,
                rating,
                note,
            },
        });
        return NextResponse.json(watchedFilm, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
    }
}
