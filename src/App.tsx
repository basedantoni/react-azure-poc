import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { MultiStepForm } from './components/multi-step-form';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MultiStepForm />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
