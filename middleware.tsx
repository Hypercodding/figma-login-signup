// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./utilities/verifyToken";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(path)
    const publicPaths = ["/", "/auth", "/signin"];
    const isPublicPath = publicPaths.includes(path);
    const token = request.cookies.get("access_token")?.value;

    const verifiedToken = token && await verifyJwtToken(token).catch((error: any) => {
        console.log("Token verification error", error);
        return null;
    });

    if (isPublicPath) {
        if (verifiedToken && path === "/signin") {
            return NextResponse.redirect(new URL("/home", request.url));
        }
        return NextResponse.next();
    }

    if (!verifiedToken && path === "/home") {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/home", "/signin", "/auth"]
};
