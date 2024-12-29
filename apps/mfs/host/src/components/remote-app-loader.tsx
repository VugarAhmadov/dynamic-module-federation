import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import { useSuspenseQuery } from '@tanstack/react-query';

const loadRemoteComponent = async ({
  url,
  scope,
  moduleName,
}: {
  url: string;
  scope: string;
  moduleName: string;
}) => {
  registerRemotes([
    {
      entry: url,
      name: scope,
    },
  ]);
  const Module = await loadRemote<any>(`${scope}/${moduleName}`, {
    from: 'runtime',
  }).then((data) => data.default);
  return Module;
};

const useRemote = ({
  url,
  scope,
  moduleName,
}: {
  url: string;
  scope: string;
  moduleName: string;
}) => {
  return useSuspenseQuery({
    queryKey: [url, scope, moduleName],
    queryFn: async () => await loadRemoteComponent({ url, scope, moduleName }),
    staleTime: Infinity,
  });
};

export function RemoteAppLoader({
  url,
  scope,
  moduleName,
}: {
  url: string;
  scope: string;
  moduleName: string;
}) {
  const { data: Component } = useRemote({ url, scope, moduleName });

  return <Component />;
}
