import { MantineProvider } from '@mantine/core';
import { AppRouter } from './app-router';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}
