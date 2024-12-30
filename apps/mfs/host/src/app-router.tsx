import { lazy, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

import { NotFound } from "./components/not-found";
import { RemoteRoute } from "./components/remote-route";
import { MainLayout } from "./layouts/main";

const LoginPage = lazy(() => import("./pages/login"));

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense
            fallback={
              <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
            }
          >
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/" element={<MainLayout />}>
        <Route path="/:frontUrl/*" element={<RemoteRoute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
