import { getSession } from "@admin/libs/auth";
import db from "@admin/libs/db";

export async function GET(request: Request) {
  const session = await getSession();

  const users = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      remotes: {
        include: {
          remote: true,
        },
        where: {
          remote: {
            isActive: true,
          },
        },
        orderBy: {
          remoteId: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const remotesOnly = users?.remotes.map((userRemote) => userRemote.remote);

  return Response.json(
    { data: { ...users, remotes: remotesOnly } },
    {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}
