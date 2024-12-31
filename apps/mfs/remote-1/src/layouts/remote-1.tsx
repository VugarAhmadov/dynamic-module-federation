import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";

import { AppNavLink } from "../components/app-nav-link";

export function Remote1Layout() {
  return (
    <Box>
      <nav
        style={{
          display: "flex",
          borderBottom: "1px solid var(--app-shell-border-color)",
          paddingBottom: "0.5rem",
        }}
      >
        <AppNavLink to="/remote-1/test-1" label="Test 1" />
        <AppNavLink to="/remote-1/test-2" label="Test 2" />
        <AppNavLink to="/remote-1/test-3" label="Test 3" />
      </nav>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
