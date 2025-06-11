import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { watchlistId: string } }) {
    const { watchlistId } = params;
    const watchlistFilm = await prisma.watchlist.findUnique({ where: { id: Number(watchlistId) } });
    return NextResponse.json(watchlistFilm);
}
