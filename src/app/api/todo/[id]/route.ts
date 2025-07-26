import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling, createSuccessResponse } from "@/lib/api";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    return createSuccessResponse(todo);
  });
}

export async function PATCH(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: !todo?.completed },
    });
    return createSuccessResponse(updatedTodo);
  });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  return withErrorHandling(async () => {
    const { id } = params;
    const deletedTodo = await prisma.todo.delete({
      where: { id: Number(id) },
    });
    return createSuccessResponse(deletedTodo);
  });
}
