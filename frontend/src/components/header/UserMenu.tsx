import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/common/Button';
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';

interface UserMenuProps {
  session: Session;
}

export function UserMenu({ session }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  const displayName = session.user?.name || session.user?.email || 'User';

  return (
    <div className='relative' ref={menuRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant='outline'
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all hover:bg-blue-50 hover:text-gray-900 bg-[#3b82f6] text-white'
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={displayName}
            width={20}
            height={20}
            className='rounded-full'
          />
        ) : (
          <User className='h-4 w-4' />
        )}
        <span className='max-w-24 truncate'>{displayName}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
          >
            <div className='py-1'>
              <div className='px-4 py-3 border-b border-gray-100'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {session.user?.name || 'User'}
                </p>
                {session.user?.email && (
                  <p className='text-xs text-gray-500 truncate'>
                    {session.user.email}
                  </p>
                )}
              </div>

              <Link
                href='/dashboard'
                className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className='h-4 w-4' />
                Dashboard
              </Link>

              <a
                href='/settings'
                className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                <Settings className='h-4 w-4' />
                Settings
              </a>

              <button
                onClick={handleLogout}
                className='flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
              >
                <LogOut className='h-4 w-4' />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
