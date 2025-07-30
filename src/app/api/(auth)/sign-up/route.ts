import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import {
  withErrorHandling,
  createSuccessResponse,
  validateRequest,
} from "@/lib/api";
import { signUpSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const { username, password } = await validateRequest(request, signUpSchema);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, hashedPassword },
    });
    console.log("User successfully created:", user);
    await createSession(user.username);
    return createSuccessResponse({}, 201);
  });
}
