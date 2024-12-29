import { Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import { ErrorFallback } from "./components/error-fallback";
import { NotFound } from "./components/not-found";
import { RemoteAppLoader } from "./components/remote-app-loader";
import { useUser } from "./hooks/use-user";
import { MainLayout } from "./layouts/main";

export function AppRouter() {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {data?.remotes.map((remote) => (
          <Route
            key={remote.id}
            path={remote.routePath}
            element={
              <Suspense
                fallback={
                  <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
                }
              >
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  key={remote.scope}
                >
                  <RemoteAppLoader
                    key={remote.scope}
                    moduleName={remote.moduleName}
                    scope={remote.scope}
                    url={remote.url}
                  />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
