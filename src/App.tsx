import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { MultiStepForm } from '@/components/multi-step-form';
import { LanguageToggle } from '@/components/language-toggle';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className='flex justify-end py-5 px-6'>
          <LanguageToggle />
        </div>
        <div className='container mx-auto flex flex-col items-center gap-4'>
          <MultiStepForm />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
