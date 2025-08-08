import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export function createErrorResponse(error: unknown, statusOverride?: number): NextResponse {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors.map((e) => e.message) }, { status: 400 });
    }

    if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientInitializationError
    ) {
        console.error("Prisma error:", error);
        return NextResponse.json({ error: "Prisma error" }, { status: 500 });
    }

    if (error instanceof Error && statusOverride) {
        return NextResponse.json({ error: error.message }, { status: statusOverride });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
}

export function createSuccessResponse<T>(data: T, status: number = 200): NextResponse {
    return NextResponse.json(data, { status });
}

export function createUnauthorizedResponse() {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function createNotFoundResponse(data: string) {
    return NextResponse.json({ error: `${data} not found` }, { status: 404 });
}

export async function validateRequest<T>(request: NextRequest, schema: z.ZodSchema<T>): Promise<T> {
    const body = await request.json();
    return schema.parse(body);
}

export async function withErrorHandling(handler: () => Promise<NextResponse>): Promise<NextResponse> {
    try {
        return await handler();
    } catch (error) {
        return createErrorResponse(error);
    }
}

export function parseId(id: string): number {
    const numId = Number(id);
    if (isNaN(numId)) {
        throw new Error("Invalid ID format");
    }
    return numId;
}
