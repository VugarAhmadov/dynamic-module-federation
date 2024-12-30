import {
  loadRemote,
  registerRemotes,
} from "@module-federation/enhanced/runtime";
import { useSuspenseQuery } from "@tanstack/react-query";

const loadRemoteComponent = async ({
  remoteUrl,
  scope,
  moduleName,
}: {
  remoteUrl: string;
  scope: string;
  moduleName: string;
}) => {
  registerRemotes([
    {
      entry: remoteUrl,
      name: scope,
    },
  ]);
  const Module = await loadRemote<any>(`${scope}/${moduleName}`, {
    from: "runtime",
  }).then((data) => data.default);
  return Module;
};

const useRemote = ({
  remoteUrl,
  scope,
  moduleName,
}: {
  remoteUrl: string;
  scope: string;
  moduleName: string;
}) => {
  return useSuspenseQuery({
    queryKey: [remoteUrl, scope, moduleName],
    queryFn: async () =>
      await loadRemoteComponent({ remoteUrl, scope, moduleName }),
    staleTime: Infinity,
  });
};

export function RemoteAppLoader({
  remoteUrl,
  scope,
  moduleName,
}: {
  remoteUrl: string;
  scope: string;
  moduleName: string;
}) {
  const { data: Component } = useRemote({ remoteUrl, scope, moduleName });

  return <Component />;
}
