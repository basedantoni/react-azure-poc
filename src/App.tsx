import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/components/theme-provider';
import { MultiStepForm } from '@/components/multi-step-form';
import { LanguageToggle } from '@/components/language-toggle';
import PayrollDeductionForm from '@/components/payroll-deduction-form';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className='flex justify-end py-5 px-6'>
          <LanguageToggle />
        </div>
        <div className='container mx-auto flex flex-col items-center gap-4'>
          <MultiStepForm />
          {/* <PayrollDeductionForm employee={employee} deductionAmount={100} /> */}
        </div>
      </ThemeProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
