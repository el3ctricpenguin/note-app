import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { WatchedFilm } from "@prisma/client";

type Params = {
    params: {
        watchedFilmId: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const { watchedFilmId } = params;
        const watchedFilm: WatchedFilm | null = await prisma.watchedFilm.findUnique({ where: { id: Number(watchedFilmId) } });
        return NextResponse.json(watchedFilm);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { watchedFilmId } = params;
        const { filmId, watchedDate, rating, note } = await request.json();

        const watchedFilm: WatchedFilm = await prisma.watchedFilm.update({
            where: { id: Number(watchedFilmId) },
            data: { filmId, watchedDate, rating, note },
        });
        return NextResponse.json(watchedFilm, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }
}
