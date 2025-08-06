import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { withErrorHandling, createSuccessResponse, createErrorResponse, validateRequest } from "@/lib/api";
import { signInSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    return withErrorHandling(async () => {
        const { username, password } = await validateRequest(request, signInSchema);
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
