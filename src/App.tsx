import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { MultiStepForm } from './components/multi-step-form';
import { RequestTable } from './components/request-table';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MultiStepForm />
        <RequestTable />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
