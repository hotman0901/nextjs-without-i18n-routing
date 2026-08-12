'use client';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React, { useState } from 'react';

// onblur 畫面不要觸發重新 call api
focusManager.setFocused(false);

function Providers({ children }: React.PropsWithChildren) {
  // 必須用 lazy initializer，否則每次 render 都會建立一個新的 QueryClient
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  );
  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default Providers;
