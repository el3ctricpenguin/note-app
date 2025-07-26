import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { withErrorHandling, createSuccessResponse, createErrorResponse } from "@/lib/api";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";

const signInSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password must be no more than 32 characters long"),
});

export async function POST(request: NextRequest) {
    return withErrorHandling(async () => {
        const body = await request.json();
        const { username, password } = signInSchema.parse(body);
        const user = await prisma.user.findUnique({ where: { username } });
        const isPasswordValid = await bcrypt.compare(password, user?.hashedPassword || "");
        if (!user || !isPasswordValid) {
            return createErrorResponse(new Error("Invalid username or password"), 401);
        }
        console.log("User signed in:", user);
        await createSession(user.username);
        return createSuccessResponse({});
    });
}
