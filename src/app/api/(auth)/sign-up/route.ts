import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";

const signUpSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password must be no more than 32 characters long"),
});

export async function POST(request: NextRequest) {
    return withErrorHandling(async () => {
        const body = await request.json();
        const { username, password } = signUpSchema.parse(body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, hashedPassword },
        });
        console.log("User successfully created:", user);
        await createSession(user.username);
        return createSuccessResponse({}, 201);
    });
}
