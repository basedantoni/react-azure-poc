import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/confirmation')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col items-center space-y-2 justify-center h-screen'>
      <Link to='/'>
        <img src='/img/zachry-logo.webp' alt='Zachry Logo' />
      </Link>
      <h1 className='text-2xl font-bold w-96 text-center'>
        Thank you for completing the Zachry Picnic Form!
      </h1>
      <p className='text-sm text-muted-foreground'>
        Your order has been confirmed and will be processed shortly.
      </p>
      <h2 className='text-2xl font-black'>TODO: Add Hotel Information</h2>
    </div>
  );
}
