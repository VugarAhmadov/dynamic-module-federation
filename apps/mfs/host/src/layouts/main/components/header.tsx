import { Box } from "@mantine/core";

import { UserDropdown } from "./user-dropdown";

export function Header() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        padding: "0 2rem",
      }}
    >
      <UserDropdown />
    </Box>
  );
}
