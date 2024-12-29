import db from '@admin/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const users = await db.user.findFirst({
    where: {
      id: Number((await params).id),
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
          remoteId: 'asc',
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  const remotesOnly = users?.remotes.map((userRemote) => userRemote.remote);

  return Response.json(
    { data: { ...users, remotes: remotesOnly } },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
