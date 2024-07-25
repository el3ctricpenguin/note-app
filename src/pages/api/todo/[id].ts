import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    switch (req.method) {
        case "GET": {
            const todo: Todo | null = await prisma.todo.findUnique({
                where: { id: Number(id) },
            });
            res.json(todo);
        }
        case "PATCH": {
            const todo: Todo | null = await prisma.todo.findUnique({
                where: { id: Number(id) },
            });
            const todoEdited: Todo = await prisma.todo.update({
                where: { id: Number(id) },
                data: { completed: !todo?.completed },
            });
            res.json(todoEdited);
        }
        case "DELETE": {
            const todo: Todo = await prisma.todo.delete({ where: { id: Number(id) } });
            res.json(todo);
        }
    }
}
