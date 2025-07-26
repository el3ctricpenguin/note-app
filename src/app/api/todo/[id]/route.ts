import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse, parseId } from "@/lib/api";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const todoId = parseId(params.id);
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });
    return createSuccessResponse(todo);
  });
}

export async function PATCH(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const todoId = parseId(params.id);
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed: !todo?.completed },
    });
    return createSuccessResponse(updatedTodo);
  });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const todoId = parseId(params.id);
    const deletedTodo = await prisma.todo.delete({
      where: { id: todoId },
    });
    return createSuccessResponse(deletedTodo);
  });
}
