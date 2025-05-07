import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/confirmation')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col items-center space-y-2 justify-center h-screen'>
      <h1 className='text-2xl font-bold'>TODO: Add Hotel Information</h1>
      <h1 className='text-2xl font-bold w-96 text-center'>
        Thank you for completing the Zachry Picnic Form!
      </h1>
      <p className='text-sm text-gray-500'>
        Your order has been confirmed and will be processed shortly.
      </p>
    </div>
  );
}
