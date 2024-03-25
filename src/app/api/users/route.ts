import { hash } from "bcrypt";
import { db } from "@/libs/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Body {
  email: string;
  username: string;
  password: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    if (req.method !== "POST")
      return NextResponse.json({
        status: 405,
        error: "Method not allowed",
    }, { status: 405 })

    const body = await req.json();
    const { username, email, password }: Body = body;
    const user = await db.users.findUnique({ where: { email } });
    
    if (user) {
        return NextResponse.json({
            status: 409,
            error: 'Account with this email already exist'
        }, { status: 409 })
    }

    const hashPassword = await hash(password, 10);
    const newUser = await db.users.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Account created successfully",
      data: newUser,
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
        status: 500,
        error: JSON.stringify(error),
      }, { status: 500 })
  }
};
