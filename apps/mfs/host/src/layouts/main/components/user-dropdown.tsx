import { forwardRef } from "react";
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { useUser } from "@host/hooks/use-user";
import { authService } from "@host/services/auth";

export function UserDropdown() {
  const { data } = useUser();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      window.location.href = "http://localhost:4200/login";
    },
  });

  if (!data) return null;

  return (
    <Menu shadow="md" offset={4} position="bottom-end">
      <Menu.Target>
        <UserButton
          image={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${data.id}.png`}
          name={data.fullname}
          username={data.username}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          onClick={() => logoutMutation()}
          disabled={isPending}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  username: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, username, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {username}
          </Text>
        </div>

        <IconChevronDown size="1rem" />
      </Group>
    </UnstyledButton>
  )
);
