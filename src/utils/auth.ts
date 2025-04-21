import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function getUserFromDB(username: string, plainPassword: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(plainPassword, user.hashedPassword);
    if (!isValid) return null;

    return {
        id: user.id,
        username: user.username,
        hashedPassword: user.hashedPassword,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
