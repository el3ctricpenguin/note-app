import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { watchlistId: string } }) {
    const { watchlistId } = params;
    const watchlistFilm = await prisma.watchlist.findUnique({ where: { id: Number(watchlistId) } });
    return NextResponse.json(watchlistFilm);
}

export async function PUT(req: NextRequest, { params }: { params: { watchlistId: string } }) {
    const { watchlistId } = params;
    const { recommendedBy, note, isWatched } = await req.json();
    try {
        const updated = await prisma.watchlist.update({
            where: { id: Number(watchlistId) },
            data: { recommendedBy, note, isWatched },
        });
        return NextResponse.json(updated, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }
}
