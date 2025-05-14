import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
    params: {
        id: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = params;

    const todo = await prisma.todo.findUnique({
        where: { id: Number(id) },
    });

    return NextResponse.json(todo);
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const { id } = params;

    const todo = await prisma.todo.findUnique({
        where: { id: Number(id) },
    });

    const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { completed: !todo?.completed },
    });

    return NextResponse.json(updatedTodo);
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const { id } = params;

    const deletedTodo = await prisma.todo.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json(deletedTodo);
}
