import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";
import { Todo } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET() {
    return withErrorHandling(async () => {
        const todos: Todo[] = await prisma.todo.findMany({ orderBy: { id: "asc" } });
        return createSuccessResponse(todos);
    });
}

export async function POST(request: NextRequest) {
    return withErrorHandling(async () => {
        const { title } = await request.json();
        const newTodo: Todo = await prisma.todo.create({
            data: {
                title,
            },
        });
        return createSuccessResponse(newTodo, 201);
    });
}
