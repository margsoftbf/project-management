import React from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { PropertySidebar } from './PropertySidebar';

interface PropertyLayoutProps {
  children: React.ReactNode;
  role?: 'admin' | 'landlord' | 'tenant';
  userInfo?: {
    firstName?: string | null;
    lastName?: string | null;
    avatar?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    postalCode?: string | null;
  } | null;
}

const PropertyLayout: React.FC<PropertyLayoutProps> = ({
  children,
  role = 'landlord',
  userInfo,
}) => {
  const pathname = usePathname();

  const getHeaderTitle = () => {
    if (pathname?.startsWith('/dashboard')) {
      return 'Dashboard';
    } else if (pathname?.startsWith('/properties')) {
      return 'Properties';
    } else if (pathname?.startsWith('/tenants')) {
      return 'Tenants';
    } else if (pathname?.startsWith('/payments')) {
      return 'Payments';
    } else if (pathname?.startsWith('/issues')) {
      return 'Issues';
    } else if (pathname?.startsWith('/contracts')) {
      return 'Contracts';
    } else if (pathname?.startsWith('/reports')) {
      return 'Reports';
    } else if (pathname?.startsWith('/my-property')) {
      return 'My Property';
    } else if (pathname?.startsWith('/contract')) {
      return 'Contract';
    } else if (pathname?.startsWith('/profile')) {
      return 'Profile';
    } else if (pathname?.startsWith('/settings')) {
      return 'Settings';
    } else if (pathname?.startsWith('/notifications')) {
      return 'Notifications';
    }
    return 'PropertyManager';
  };

  return (
    <SidebarProvider>
      <PropertySidebar role={role} userInfo={userInfo} />
      <SidebarInset className='bg-gray-50'>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b border-gray-200 shadow-sm'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1 text-gray-600 hover:bg-gray-100' />
            <div className='h-4 w-px bg-gray-300' />
            <nav className='flex items-center space-x-2 text-sm'>
              <span className='text-gray-500 font-medium'>PropertyManager</span>
              <span className='text-gray-300'>/</span>
              <span className='text-gray-900 font-semibold'>
                {getHeaderTitle()}
              </span>
            </nav>
          </div>
        </header>
        <main className='flex-1 p-6 bg-gray-50 min-h-[calc(100vh-4rem)]'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PropertyLayout;
