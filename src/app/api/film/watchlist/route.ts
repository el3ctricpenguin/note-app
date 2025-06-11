import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const watchlistFilms = await prisma.watchlist.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(watchlistFilms);
}

export async function POST(req: NextRequest) {
    try {
        const { filmId, recommendedBy, note, isWatched } = await req.json();
        const watchlistFilm = await prisma.watchlist.create({
            data: {
                filmId,
                recommendedBy,
                note,
                isWatched,
            },
        });
        return NextResponse.json(watchlistFilm, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
    }
}
