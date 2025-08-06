import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, validateRequest } from "@/lib/api";
import { todoSchema } from "@/lib/validation";
import { Todo } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET() {
    return withErrorHandling(async () => {
        const todos: Todo[] = await prisma.todo.findMany({
            orderBy: { id: "asc" },
        });
        return createSuccessResponse(todos);
    });
}

export async function POST(request: NextRequest) {
    return withErrorHandling(async () => {
        const { title } = await validateRequest(request, todoSchema);
        const newTodo: Todo = await prisma.todo.create({
            data: {
                title,
            },
        });
        return createSuccessResponse(newTodo, 201);
    });
}
