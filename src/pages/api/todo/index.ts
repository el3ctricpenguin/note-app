import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const todos: Todo[] = await prisma.todo.findMany();
            res.json(todos);
        case "POST":
            const { title } = req.body;
            const newTodo: Todo = await prisma.todo.create({
                data: {
                    title,
                },
            });
            res.json(newTodo);
    }
}
