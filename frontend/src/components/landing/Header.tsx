import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Logo } from '../icons/Logo';
import { Menu, X } from 'lucide-react';
import { NavLinks } from '@/components/landing/NavLinks';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthButtons } from '../header/AuthButtons';
import { MobileMenu } from '../header/MobileMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className='sticky top-0 z-50 w-full bg-white backdrop-blur-md'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0 z-50'>
            <Link
              href='/'
              aria-label='Home'
              className='flex items-center gap-3 transition-opacity hover:opacity-90'
            >
              <Logo
                className='h-10 w-auto'
                primaryColor='#0f59cf'
                secondaryColor='#0f59cf'
              />
              <span className='flex items-center font-montserrat'>
                <span className='text-lg font-medium text-blue-700'>
                  Property
                </span>
                <span className='text-lg font-bold text-blue-700'>Manager</span>
              </span>
            </Link>
          </div>

          <div className='hidden lg:flex items-center justify-center flex-1'>
            <div className='flex space-x-10'>
              <NavLinks />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='hidden lg:flex items-center gap-4'>
              <AuthButtons session={session} status={status} />
            </div>

            <div className='lg:hidden'>
              <button
                type='button'
                className='relative z-10 inline-flex items-center justify-center rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200'
                aria-label='Toggle site navigation'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AnimatePresence initial={false} mode='wait'>
                  {mobileMenuOpen ? (
                    <motion.div
                      key='close'
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className='h-6 w-6' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='menu'
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className='h-6 w-6' />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                session={session}
                status={status}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
