import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;
	//allow the request to go through if the following is true
	if (pathname.includes("/api/auth") || token) {
		return NextResponse.next();
	}

	// redirect them to login if they dont have a token and are requesting a protected route

	if (!token && pathname !== "/login") {
		return NextResponse.redirect("/login");
	}
}
