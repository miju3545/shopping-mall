import React from 'react';

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { getClient } from './queryClient';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
export default function App() {
  const element = useRoutes(routes);
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      {element}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
