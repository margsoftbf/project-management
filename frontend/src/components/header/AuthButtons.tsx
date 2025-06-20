import { Button } from '@/components/common/Button';
import { UserMenu } from './UserMenu';
import { Session } from 'next-auth';

interface AuthButtonsProps {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

export function AuthButtons({ session, status }: AuthButtonsProps) {
  if (status === 'loading') {
    return (
      <div className='h-9 w-24 bg-gray-200 animate-pulse rounded-md'></div>
    );
  }

  if (status === 'authenticated' && session) {
    return <UserMenu session={session} />;
  }

  return (
    <>
      <Button
        href='/login'
        variant='outline'
        className='px-5 py-2 text-sm font-medium transition-all hover:bg-blue-50'
      >
        Log in
      </Button>
      <Button
        href='/register'
        className='px-5 py-2 text-sm font-medium shadow-md transition-all hover:shadow-lg'
      >
        Register
      </Button>
    </>
  );
}
