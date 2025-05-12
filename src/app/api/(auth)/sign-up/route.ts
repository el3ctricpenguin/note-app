import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signUpSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password must be no more than 32 characters long"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = signUpSchema.parse(body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, hashedPassword },
        });
        console.log("User successfully created:", user);
        await createSession(user.username);
        return NextResponse.json({}, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors.map((e) => e.message) }, { status: 400 });
        }
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
    }
}
