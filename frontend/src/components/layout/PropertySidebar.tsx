import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Building2, Settings, User, LogOut, ChevronDown } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  landlordMenuItems,
  tenantMenuItems,
  settingsMenuItems,
} from './menuItems';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface PropertySidebarProps {
  role: 'admin' | 'landlord' | 'tenant';
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

export function PropertySidebar({
  role = 'landlord',
  userInfo,
}: PropertySidebarProps) {
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = role === 'landlord' ? landlordMenuItems : tenantMenuItems;

  const isActiveMenuItem = (url: string) => {
    if (!pathname) return false;
    return pathname === url || pathname.startsWith(url + '/');
  };

  const getUserInitials = () => {
    if (userInfo?.firstName && userInfo?.lastName) {
      return `${userInfo.firstName[0]}${userInfo.lastName[0]}`;
    }
    if (userInfo?.email) {
      return userInfo.email.substring(0, 2).toUpperCase();
    }
    return 'PM';
  };

  const getUserName = () => {
    if (userInfo?.firstName && userInfo?.lastName) {
      return `${userInfo.firstName} ${userInfo.lastName}`;
    }
    return userInfo?.email || 'User';
  };

  return (
    <Sidebar variant='inset' className='border-r border-gray-200'>
      <SidebarHeader className='border-b border-gray-200 bg-white'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-blue-50 data-[state=open]:text-blue-900 hover:bg-gray-50'
              onClick={() => router.push('/')}
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white'>
                <Building2 className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold text-gray-900'>
                  Property Manager
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='bg-white'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-gray-500 text-xs font-medium uppercase tracking-wider px-3'>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActiveMenuItem(item.url)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    <Link href={item.url} className='flex items-center'>
                      <item.icon className='size-4' />
                      <span className='font-medium'>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={
                            isActiveMenuItem(item.url)
                              ? 'secondary'
                              : 'secondary'
                          }
                          className={`ml-auto text-xs ${
                            isActiveMenuItem(item.url)
                              ? 'bg-white text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className='text-gray-500 text-xs font-medium uppercase tracking-wider px-3'>
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1'>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActiveMenuItem(item.url)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    <Link href={item.url}>
                      <item.icon className='size-4' />
                      <span className='font-medium'>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant='destructive'
                          className='ml-auto text-xs'
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t border-gray-200 bg-white'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900 hover:bg-gray-50'
                >
                  <Avatar className='h-8 w-8 rounded-lg border border-gray-200'>
                    <AvatarImage
                      src={userInfo?.avatar || undefined}
                      alt='Avatar'
                    />
                    <AvatarFallback className='rounded-lg bg-blue-600 text-white text-xs font-medium'>
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold text-gray-900'>
                      {getUserName()}
                    </span>
                    <span className='truncate text-xs text-gray-500'>
                      {userInfo?.email}
                    </span>
                  </div>
                  <ChevronDown className='ml-auto size-4 text-gray-500' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white border border-gray-200'
                side={state === 'collapsed' ? 'right' : 'top'}
                align='end'
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link
                    href='/profile'
                    className='hover:bg-gray-50 text-gray-700 cursor-pointer'
                  >
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href='/settings'
                    className='hover:bg-gray-50 text-gray-700 cursor-pointer'
                  >
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='hover:bg-gray-50 text-gray-700 cursor-pointer'
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
