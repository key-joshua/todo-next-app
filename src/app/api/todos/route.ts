import { db } from "@/libs/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Body {
  name: string;
  description: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    if (req.method !== "POST")
      return NextResponse.json(
        {
          status: 405,
          error: "Method not allowed",
        },
        { status: 405 }
      );

    const body = await req.json();
    const { name, description }: Body = body;
    const todo = await db.todos.findUnique({ where: { name } });

    if (todo) {
      return NextResponse.json(
        {
          status: 409,
          error: "Task with this name already exist",
        },
        { status: 409 }
      );
    }

    const newTodo = await db.todos.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Task created successfully",
        data: newTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    if (req.method !== "GET")
      return NextResponse.json(
        {
          status: 405,
          error: "Method not allowed",
        },
        { status: 405 }
      );

    const todos = await db.todos.findMany();
    return NextResponse.json(
      {
        status: 200,
        message: "Task created successfully",
        data: todos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    if (req.method !== "PUT")
      return NextResponse.json(
        {
          status: 405,
          error: "Method not allowed",
        },
        { status: 405 }
      );

    const body = await req.json();
    const { name, description }: Body = body;
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          status: 404,
          error: "Id param not found",
        },
        { status: 404 }
      );
    }

    const todo = await db.todos.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      return NextResponse.json(
        {
          status: 404,
          error: "Task not found",
        },
        { status: 404 }
      );
    }

    const updatedTodo = await db.todos.update({
      where: { id: Number(id) },
      data: { name, description },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Task updated successfully",
        data: updatedTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    if (req.method !== "DELETE")
      return NextResponse.json(
        {
          status: 405,
          error: "Method not allowed",
        },
        { status: 405 }
      );

    const body = await req.json();
    const { name, description }: Body = body;
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          status: 404,
          error: "Id param not found",
        },
        { status: 404 }
      );
    }

    const todo = await db.todos.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      return NextResponse.json(
        {
          status: 404,
          error: "Task not found",
        },
        { status: 404 }
      );
    }

    const updatedTodo = await db.todos.delete({ where: { id: Number(id) } });

    return NextResponse.json(
      {
        status: 200,
        message: "Task deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
};
