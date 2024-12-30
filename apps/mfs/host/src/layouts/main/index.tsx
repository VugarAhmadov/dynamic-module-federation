import { Suspense, useEffect } from "react";
import { AppShell, Box, LoadingOverlay, Title } from "@mantine/core";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@host/hooks/use-user";
import { Header } from "./components/header";
import { Navigation } from "./components/navigation";
import { ThemeSwitcher } from "./components/theme-switcher";

export function MainLayout() {
  const [cookies] = useCookies(["isLoggedIn"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const { isPending } = useUser();

  if (isPending) {
    return <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />;
  }

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

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
          <Title order={3}>Backoffice SHELL</Title>
          <ThemeSwitcher />
        </Box>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main
        styles={{ main: { display: "flex", position: "relative" } }}
      >
        <Box style={{ position: "relative", flex: "1" }}>
          <Suspense fallback={<LoadingOverlay visible />}>
            <Outlet />
          </Suspense>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
