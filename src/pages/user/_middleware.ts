import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { backendApi, config } from "@utils";

export const cookieName = config.NEXT_PUBLIC_COOKIE_NAME;

function setCookie(res: NextResponse, token: string) {
	res.cookie(cookieName, token, {
		path: "/",
		maxAge: 1000 * 60 * 60 * 24 * 7, // one week
		httpOnly: true,
		sameSite: true,
		secure: false
	});
}

function destroyCookie(res: NextResponse) {
	res.cookie(cookieName, "", {
		path: "/",
		maxAge: 0,
		httpOnly: true,
		sameSite: true,
		secure: false
	});
}

export async function middleware(req: NextRequest) {
	const response = NextResponse.next();
	const token = req.cookies[cookieName];
	if (!token) return NextResponse.redirect(`${config.NEXT_PUBLIC_DOMAIN}/auth/login`, 307);

	try {
		const data = await backendApi.get<{ token: string }>("clients/refresh/token", {
			headers: {
				Authorization: `Bearer: ${token}`
			}
		});
		setCookie(response, data.token);
		return response;
	} catch (error) {
		destroyCookie(response);
		return NextResponse.redirect(`${config.NEXT_PUBLIC_DOMAIN}/auth/login`, 307);
	}
}
