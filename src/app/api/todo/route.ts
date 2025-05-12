import { prisma } from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const todos: Todo[] = await prisma.todo.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
    const { title } = await request.json();
    const newTodo: Todo = await prisma.todo.create({
        data: {
            title,
        },
    });
    return NextResponse.json(newTodo);
}
