import db from '@admin/libs/db';

import { UsersList } from './_components/list';
import { Box, Title } from '@mantine/core';

export default async function UsersPage() {
  const users = await db.user.findMany({
    include: {
      remotes: {
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

  const remotes = await db.remote.findMany({
    where: { isActive: true },
    orderBy: { id: 'asc' },
  });

  return (
    <Box>
      <Title order={1} mb="30px">
        Users
      </Title>
      <UsersList users={users} remotes={remotes} />
    </Box>
  );
}
