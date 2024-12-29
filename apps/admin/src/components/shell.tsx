"use client";

import { ReactNode, Suspense } from "react";
import { AppShell, Box, LoadingOverlay, Title } from "@mantine/core";

import { Navigation } from "@admin/components/navigation";
import { ThemeSwitcher } from "@admin/components/theme-switcher";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="lg"
    >
      <AppShell.Header />

      <AppShell.Navbar>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            borderBottom: "1px solid var(--app-shell-border-color)",
            height: "60px",
            padding: "0 20px",
          }}
        >
          <Title order={3}>Admin</Title>
          <ThemeSwitcher />
        </Box>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main
        styles={{ main: { display: "flex", position: "relative" } }}
      >
        <Box style={{ position: "relative", flex: "1" }}>
          <Suspense fallback={<LoadingOverlay visible />}>{children}</Suspense>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
