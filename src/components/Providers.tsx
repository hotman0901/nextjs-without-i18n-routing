'use client';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React, { useEffect, useState } from 'react';

function Providers({ children }: React.PropsWithChildren) {
  // onblur 畫面不要觸發重新 call api。
  // 放在 useEffect 內，避免模組載入時在 server 端就執行這個副作用
  useEffect(() => {
    focusManager.setFocused(false);
  }, []);

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
