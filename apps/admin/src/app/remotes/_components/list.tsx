'use client';

import { useState } from 'react';
import { Box, Button, Flex, Switch, Table, Title } from '@mantine/core';

import { deleteRemote, toggleRemoteActiveStatus } from '@admin/actions/remote';
import { IUserRemote } from '@admin/types';
import { ConfirmDialog } from '@admin/components/confirm-dialog';

import { Actions } from './actions';
import { AddOrEditModal } from './add-or-edit-modal';

export function RemotesList({ remotes }: { remotes: IUserRemote[] }) {
  const [modal, setModal] = useState<{
    opened: boolean;
    data: null | IUserRemote;
  }>({ opened: false, data: null });
  const [confirmDialog, setConfirmDialog] = useState<{
    opened: boolean;
    id: null | number;
  }>({
    opened: false,
    id: null,
  });

  const handleDeleteConfirm = async () => {
    const result = await deleteRemote(confirmDialog.id!);
    if (result === 'ok') {
      setConfirmDialog({ opened: false, id: null });
    }
  };

  return (
    <Box>
      <Flex w="100%" justify="space-between" align="center" mb="30px">
        <Title order={1}>Remotes</Title>
        <Button onClick={() => setModal({ opened: true, data: null })}>
          Add new remote
        </Button>
      </Flex>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        withTableBorder
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
            <Table.Th>Label</Table.Th>
            <Table.Th>Scope</Table.Th>
            <Table.Th>Module name</Table.Th>
            <Table.Th>URL</Table.Th>
            <Table.Th>Front URL</Table.Th>
            <Table.Th>Route path</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Active</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {remotes.map((remote) => (
            <Table.Tr key={remote.id}>
              <Table.Td style={{ textAlign: 'center' }}>{remote.id}</Table.Td>
              <Table.Td>{remote.label}</Table.Td>
              <Table.Td>{remote.scope}</Table.Td>
              <Table.Td>{remote.moduleName}</Table.Td>
              <Table.Td>{remote.url}</Table.Td>
              <Table.Td>{remote.frontUrl}</Table.Td>
              <Table.Td>{remote.routePath}</Table.Td>
              <Table.Td>
                <Switch
                  checked={remote.isActive}
                  onChange={async (event) => {
                    await toggleRemoteActiveStatus(
                      remote.id,
                      event.currentTarget.checked
                    );
                  }}
                />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <Actions
                  onEdit={() => setModal({ opened: true, data: remote })}
                  onDelete={() =>
                    setConfirmDialog({ opened: true, id: remote.id })
                  }
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <AddOrEditModal
        opened={modal.opened}
        onClose={() => setModal({ opened: false, data: null })}
        data={modal.data}
      />
      <ConfirmDialog
        onClose={() => setConfirmDialog({ opened: false, id: null })}
        opened={confirmDialog.opened}
        title="Are you sure to delete the remote?"
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
