import { Outlet, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { lazy, Suspense } from 'react';

// Lazy load dev tools only in development
const TanStackRouterDevtools = lazy(() =>
  import.meta.env.DEV
    ? import('@tanstack/react-router-devtools').then((module) => ({
        default: module.TanStackRouterDevtools,
      }))
    : Promise.resolve({ default: () => null })
);

const ReactQueryDevtools = lazy(() =>
  import.meta.env.DEV
    ? import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    : Promise.resolve({ default: () => null })
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
        <Toaster />
      </ThemeProvider>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
