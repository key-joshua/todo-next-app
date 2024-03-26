import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session && request.nextUrl.pathname.startsWith("/todos"))
        return Response.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.\\.png$).)"],
};
