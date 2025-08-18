import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, parseId, createUnauthorizedResponse, createNotFoundResponse } from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/session";

type Params = {
    params: {
        id: string;
    };
};

export async function GET(_request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const todoId = parseId(params.id);
        const todo = await prisma.todo.findFirst({
            where: { id: todoId, userId: user.id },
        });

        if (!todo) {
            return createNotFoundResponse("Todo");
        }

        return createSuccessResponse(todo);
    });
}

export async function PATCH(_request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const todoId = parseId(params.id);
        const todo = await prisma.todo.findFirst({
            where: { id: todoId, userId: user.id },
        });

        if (!todo) {
            return createNotFoundResponse("Todo");
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data: { completed: !todo.completed },
        });
        return createSuccessResponse(updatedTodo);
    });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    return withErrorHandling(async () => {
        const user = await getAuthenticatedUser();
        if (!user) {
            return createUnauthorizedResponse();
        }

        const todoId = parseId(params.id);
        const todo = await prisma.todo.findFirst({
            where: { id: todoId, userId: user.id },
        });

        if (!todo) {
            return createNotFoundResponse("Todo");
        }

        const deletedTodo = await prisma.todo.delete({
            where: { id: todoId },
        });
        return createSuccessResponse(deletedTodo);
    });
}
