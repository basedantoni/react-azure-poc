import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { MultiStepForm } from './components/multi-step-form';
import { RequestTable } from './components/requests/request-table';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className='container mx-auto flex flex-col gap-4'>
          <MultiStepForm />
          <RequestTable />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
