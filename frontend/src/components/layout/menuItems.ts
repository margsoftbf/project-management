import {
  Building2,
  Users,
  DollarSign,
  AlertTriangle,
  FileText,
  BarChart3,
  Home,
  CreditCard,
  User,
  Bell,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

export const landlordMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Properties',
    url: '/properties',
    icon: Building2,
    badge: '12',
  },
  {
    title: 'Tenants',
    url: '/tenants',
    icon: Users,
    badge: '28',
  },
  {
    title: 'Payments',
    url: '/payments',
    icon: DollarSign,
    badge: '2',
  },
  {
    title: 'Issues',
    url: '/issues',
    icon: AlertTriangle,
    badge: '3',
  },
  {
    title: 'Contracts',
    url: '/contracts',
    icon: FileText,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
  },
];

export const adminMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Properties',
    url: '/properties',
    icon: Building2,
    badge: '12',
  },
  {
    title: 'Tenants',
    url: '/tenants',
    icon: Users,
    badge: '28',
  },
  {
    title: 'Payments',
    url: '/payments',
    icon: DollarSign,
    badge: '2',
  },
  {
    title: 'Issues',
    url: '/issues',
    icon: AlertTriangle,
    badge: '3',
  },
  {
    title: 'Contracts',
    url: '/contracts',
    icon: FileText,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: BarChart3,
  },
];

export const tenantMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'My Property',
    url: '/my-property',
    icon: Building2,
  },
  {
    title: 'Payments',
    url: '/payments',
    icon: CreditCard,
  },
  {
    title: 'Issues',
    url: '/issues',
    icon: AlertTriangle,
    badge: '1',
  },
  {
    title: 'Contract',
    url: '/contract',
    icon: FileText,
  },
];

export const settingsMenuItems: MenuItem[] = [
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
    badge: '5',
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];
