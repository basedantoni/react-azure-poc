import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/confirmation')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center space-y-2 justify-center h-screen'>
      <Link to='/'>
        <img src='/img/zachry-logo.webp' alt='Zachry Logo' />
      </Link>
      <h1 className='text-2xl font-bold w-96 text-center'>
        {t('thankYouForCompletingTheZachryPicnicForm')}
      </h1>
      <p className='text-sm text-muted-foreground'>
        {t('yourOrderHasBeenConfirmedAndWillBeProcessedShortly')}
      </p>
      <h2 className='text-2xl font-black'>TODO: Add Hotel Information</h2>
    </div>
  );
}
