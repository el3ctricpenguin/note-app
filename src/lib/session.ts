import { isProduction } from "@/constants";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET);
const cookiesPath = "token";

export async function createSession(username: string) {
    const sessionHours = 2;
    const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(`${sessionHours}h`)
        .sign(SECRET);

    const cookieStore = await cookies();

    cookieStore.set(cookiesPath, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: sessionHours * 60 * 60,
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookiesPath)?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload as { username: string };
    } catch {
        return null;
    }
}

export async function clearSession() {
    const cookieStore = await cookies();
    return cookieStore.delete(cookiesPath);
}

export async function getAuthenticatedUser(): Promise<User | null> {
    const session = await getSession();
    if (!session) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { username: session.username },
    });

    return user;
}
