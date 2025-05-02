import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const signUpSchema = z.object({
    username: z.string().min(1, "ユーザー名は必須です"),
    password: z.string().min(8, "パスワードは8文字以上である必要があります").max(32, "パスワードは32文字以下である必要があります"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const parsedData = signUpSchema.parse(req.body);
        const { username, password } = parsedData;

        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            console.error("Sign-up error: Username already taken");
            return res.status(400).json({ message: "Username is already taken" });
        }

        const hashedPassword = await hash(password, 10);

        const createdUser = await prisma.user.create({
            data: {
                username,
                hashedPassword,
            },
        });

        return res.status(201).json({ message: "User created successfully", user: createdUser });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Sign-up error (Validation):", error.errors);
            return res.status(400).json({ message: "Validation error" });
        }
        console.error("Sign-up error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
