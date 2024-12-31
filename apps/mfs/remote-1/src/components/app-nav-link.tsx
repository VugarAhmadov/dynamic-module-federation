import { NavLink } from "@mantine/core";
import {
  LinkProps,
  NavLink as RouterNavLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

export function AppNavLink({ to, label }: LinkProps & { label: string }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      component={RouterNavLink}
      active={!!match}
      label={label}
      style={{ width: "auto" }}
      variant="subtle"
    />
  );
}
