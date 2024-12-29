'use client';

import { updateUserRemotes } from '@admin/actions/users';
import { IUser, IUserRemote } from '@admin/types';
import { MultiSelect, Table } from '@mantine/core';

export function UsersList({
  users,
  remotes,
}: {
  users: IUser[];
  remotes: IUserRemote[];
}) {
  return (
    <Table
      horizontalSpacing="md"
      verticalSpacing="xs"
      withTableBorder
      withColumnBorders
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Fullname</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Password</Table.Th>
          <Table.Th>Remotes</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>{user.id}</Table.Td>
            <Table.Td>{user.fullname}</Table.Td>
            <Table.Td>{user.username}</Table.Td>
            <Table.Td>{user.password}</Table.Td>
            <Table.Td>
              <MultiSelect
                data={remotes.map((remote) => ({
                  value: remote.id.toString(),
                  label: remote.label,
                }))}
                value={user.remotes.map((remote) => remote.remoteId.toString())}
                onChange={async (value) =>
                  await updateUserRemotes(
                    user.id,
                    value.map((v) => Number(v))
                  )
                }
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
