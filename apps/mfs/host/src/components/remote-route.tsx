import { Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

import { useUser } from "@host/hooks/use-user";
import { ErrorFallback } from "./error-fallback";
import { NotFound } from "./not-found";
import { RemoteAppLoader } from "./remote-app-loader";

export function RemoteRoute() {
  const { data } = useUser();
  const { frontUrl } = useParams();

  if (!data) {
    return null;
  }

  const remote = data.remotes.find(
    (remote) => remote.frontUrl === `/${frontUrl}`
  );

  if (!remote) {
    return <NotFound />;
  }

  return (
    <Suspense
      fallback={<LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback} key={remote.scope}>
        <RemoteAppLoader
          key={remote.scope}
          moduleName={remote.moduleName}
          scope={remote.scope}
          remoteUrl={remote.remoteUrl}
        />
      </ErrorBoundary>
    </Suspense>
  );
}
