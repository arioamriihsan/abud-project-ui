import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10 Second by default
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default queryClient;
