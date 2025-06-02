'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { NavLinks } from '@/components/NavLinks';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './icons/Logo';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md'>
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
                primaryColor='#003566'
                secondaryColor='#003566'
              />
              <span className='flex items-center font-montserrat'>
                <span className='text-lg font-medium text-[#003566]'>
                  Property
                </span>
                <span className='text-lg font-bold text-[#003566]'>
                  Manager
                </span>
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

              <AnimatePresence initial={false}>
                {mobileMenuOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='fixed inset-0 z-0 bg-gray-800/40 backdrop-blur-sm'
                      onClick={() => setMobileMenuOpen(false)}
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
                        {[
                          'Features',
                          'How It Works',
                          'For Whom',
                          'Pricing',
                          'Contact',
                        ].map((item) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay:
                                0.1 *
                                [
                                  'Features',
                                  'How It Works',
                                  'For Whom',
                                  'Pricing',
                                  'Contact',
                                ].indexOf(item),
                            }}
                          >
                            <Link
                              href={`/#${item.toLowerCase()}`}
                              className='group flex items-center py-2 text-base font-medium tracking-tight text-gray-800 transition-colors hover:text-gray-900'
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className='relative'>
                                {item}
                                <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-gray-900 transition-all group-hover:w-full'></span>
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      <div className='mt-8 flex flex-col gap-3'>
                        <Button
                          href='/login'
                          variant='outline'
                          className='w-full justify-center'
                        >
                          Log in
                        </Button>
                        <Button
                          href='/register'
                          className='w-full justify-center'
                        >
                          Register
                        </Button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
