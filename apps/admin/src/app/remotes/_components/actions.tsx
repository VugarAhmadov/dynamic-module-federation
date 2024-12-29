import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";

export function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <Menu shadow="md" width={100} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="default">
          <IconDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconEdit style={{ width: "1rem", height: "1rem" }} />} onClick={onEdit}>
          Edit
        </Menu.Item>
        <Menu.Item color="red" leftSection={<IconTrash style={{ width: "1rem", height: "1rem" }} />} onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
