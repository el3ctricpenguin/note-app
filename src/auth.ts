import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { object, string, ZodError } from "zod";
import { getUserFromDB } from "@/utils/auth";

const signInSchema = object({
    username: string({ required_error: "Username is required" }).min(1, "Username is required"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
                try {
                    let user = null;
                    const { username, password } = await signInSchema.parseAsync(credentials);
                    user = await getUserFromDB(username, password);

                    if (!user) {
                        throw new Error("Invalid username or password");
                    }

                    return { ...user, id: user.id.toString() };
                } catch (error) {
                    if (error instanceof ZodError) {
                        console.error("Zod validation error:", error);
                        return null;
                    }
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
});
