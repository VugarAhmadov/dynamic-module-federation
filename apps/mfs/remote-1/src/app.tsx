import { lazy, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";

import { Remote1Layout } from "./layouts/remote-1";

const Test1Page = lazy(() => import("./pages/test-1"));
const Test2Page = lazy(() => import("./pages/test-2"));
const Test3Page = lazy(() => import("./pages/test-3"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Remote1Layout />}>
        <Route index element={<Navigate to="/remote-1/test-1" />} />
        <Route
          path="/test-1"
          element={
            <Suspense
              fallback={
                <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
              }
            >
              <Test1Page />
            </Suspense>
          }
        />
        <Route
          path="/test-2"
          element={
            <Suspense
              fallback={
                <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
              }
            >
              <Test2Page />
            </Suspense>
          }
        />
        <Route
          path="/test-3"
          element={
            <Suspense
              fallback={
                <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
              }
            >
              <Test3Page />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
