import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/common/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from 'next-auth';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const navigationItems = [
  'Features',
  'How It Works',
  'For Whom',
  'Pricing',
  'Contact',
];

export function MobileMenu({
  isOpen,
  onClose,
  session,
  status,
}: MobileMenuProps) {
  const handleLogout = async () => {
    onClose();
    await signOut({ callbackUrl: '/' });
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-0 bg-gray-800/40 backdrop-blur-sm'
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className='absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-white px-6 pt-28 pb-8 shadow-xl'
          >
            <div className='space-y-5'>
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={`/#${item.toLowerCase().replace(' ', '-')}`}
                    className='group flex items-center py-2 text-base font-medium tracking-tight text-gray-800 transition-colors hover:text-gray-900'
                    onClick={onClose}
                  >
                    <span className='relative'>
                      {item}
                      <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-gray-900 transition-all group-hover:w-full'></span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className='mt-8'>
              {status === 'loading' ? (
                <div className='space-y-3'>
                  <div className='h-10 bg-gray-200 animate-pulse rounded-md'></div>
                  <div className='h-10 bg-gray-200 animate-pulse rounded-md'></div>
                </div>
              ) : status === 'authenticated' && session ? (
                <div className='space-y-4'>
                  <div className='pb-3 border-b border-gray-200'>
                    <p className='text-sm font-medium text-gray-900'>
                      {session.user?.name || 'User'}
                    </p>
                    {session.user?.email && (
                      <p className='text-xs text-gray-500'>
                        {session.user.email}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Button
                      href='/dashboard'
                      className='w-full justify-start gap-3'
                      onClick={onClose}
                    >
                      <LayoutDashboard className='h-4 w-4' />
                      Dashboard
                    </Button>
                    <Button
                      href='/settings'
                      variant='outline'
                      className='w-full justify-start gap-3'
                      onClick={onClose}
                    >
                      <Settings className='h-4 w-4' />
                      Settings
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant='outline'
                      className='w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50'
                    >
                      <LogOut className='h-4 w-4' />
                      Sign out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col gap-3'>
                  <Button
                    href='/login'
                    variant='outline'
                    className='w-full justify-center'
                  >
                    Log in
                  </Button>
                  <Button href='/register' className='w-full justify-center'>
                    Register
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
