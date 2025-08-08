import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, validateRequest, createUnauthorizedResponse } from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";
import { todoSchema } from "@/lib/validation";
import { Todo } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET() {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const todos: Todo[] = await prisma.todo.findMany({
            where: { userId: user.id },
            orderBy: { id: "asc" },
        });
        return createSuccessResponse(todos);
    });
}

export async function POST(request: NextRequest) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const { title } = await validateRequest(request, todoSchema);
        const newTodo: Todo = await prisma.todo.create({
            data: {
                title,
                userId: user.id,
            },
        });
        return createSuccessResponse(newTodo, 201);
    });
}
