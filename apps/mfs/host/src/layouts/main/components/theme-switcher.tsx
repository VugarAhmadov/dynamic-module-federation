import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSun style={{ display: computedColorScheme === "dark" ? "block" : "none" }} stroke={1} />
      <IconMoon style={{ display: computedColorScheme === "dark" ? "none" : "block" }} stroke={1} />
    </ActionIcon>
  );
}
