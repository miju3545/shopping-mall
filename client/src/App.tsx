import React from 'react';

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { getClient } from './queryClient';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Gnb from './components/Gnb';
import { worker } from './mocks/browser';
import { Provider } from 'react-redux';
import { getStore } from './redux';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

export default function App() {
  const element = useRoutes(routes);
  const queryClient = getClient();
  const store = getStore();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Gnb />
        {element}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
