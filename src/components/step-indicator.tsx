import { cn } from '@/lib/utils';

export function StepIndicator({
  current,
  steps,
}: {
  current: number;
  steps: { label: string }[];
}) {
  return (
    <div className='flex space-x-4 mb-6'>
      {steps.map((s, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 text-center py-2 border-b-2',
            i === current ? 'border-blue-500 font-semibold' : 'border-gray-200'
          )}
        >
          <h2>{s.label}</h2>
        </div>
      ))}
    </div>
  );
}
