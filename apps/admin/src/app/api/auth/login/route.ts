import { cookies } from "next/headers";

import { encrypt } from "@admin/libs/auth";
import db from "@admin/libs/db";

export async function POST(request: Request) {
  const req = await request.json();

  const user = await db.user.findFirst({
    where: { username: req.username, password: req.password },
  });

  if (!user) {
    return Response.json("User not found", {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({
    user: { id: user.id, fullName: user.fullname },
    expires,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  cookieStore.set("isLoggedIn", "true", {
    expires,
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return Response.json("Successfully logged in", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
