import { getSession } from "@/lib/session";
import { validateBasicAuth, createBasicAuthResponse } from "@/lib/basicAuth";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_URLS = ["/", "/sign-up", "/sign-in", "/api/sign-in", "/api/sign-up", "/api/sign-out"];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Basic認証チェック（最上位）
    const authHeader = request.headers.get("authorization");
    if (!validateBasicAuth(authHeader)) {
        console.log("Basic auth failed for:", pathname);
        return createBasicAuthResponse();
    }

    const isPublicPath = PUBLIC_URLS.some((url) => pathname === url || pathname.startsWith(`${url}/`));

    const session = await getSession();
    const isAuthorized = !!session;

    if (isPublicPath) {
        console.log("public path accessed: ", pathname);
        return NextResponse.next();
    }
    if (!isAuthorized) {
        console.log("unauthorized access to private path: ", pathname);
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    console.log("authorized access to private path: ", pathname);
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon\\.ico|\\.well-known).*)"],
};
