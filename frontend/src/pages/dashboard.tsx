import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, signOut } from 'next-auth/react';
import PropertyLayout from '@/components/layout/PropertyLayout';
import { PropertyApi } from '@/lib/api';
import {
  Building,
  Users,
  DollarSign,
  AlertTriangle,
  Activity,
  Plus,
  LogOut,
} from 'lucide-react';

export interface DashboardProps {
  userInfo: {
    slug: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
    avatarUrl: string | null;
    role: 'admin' | 'landlord' | 'tenant';
    address: string | null;
    city: string | null;
    postalCode: string | null;
    emailVerified: boolean;
    privacyConsent: boolean;
    marketingConsent: boolean;
    isActive: boolean;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  accessToken?: string;
}

const DashboardPage = ({ userInfo }: DashboardProps) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Property Manager - Dashboard</title>
      </Head>
      <PropertyLayout
        role={userInfo?.role}
        userInfo={{
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          avatar: userInfo?.avatarUrl,
          email: userInfo?.email,
          phoneNumber: userInfo?.phoneNumber,
          address: userInfo?.address,
          city: userInfo?.city,
          postalCode: userInfo?.postalCode,
        }}
      >
        <div className='space-y-6'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              Welcome back,{' '}
              {userInfo?.firstName || session?.user?.firstName || 'User'}!
            </h1>
            <p className='text-gray-600 mt-2'>
              Role:{' '}
              <span className='font-semibold capitalize'>{userInfo?.role}</span>
            </p>
            <p className='text-gray-600'>
              Email: <span className='font-semibold'>{userInfo?.email}</span>
            </p>

            <div className='mt-4 p-4 bg-gray-50 rounded border'>
              <h3 className='font-semibold text-sm text-gray-700 mb-2'>
                Session Debug:
              </h3>
              <pre className='text-xs text-gray-600 overflow-auto'>
                {JSON.stringify(session?.user, null, 2)}
              </pre>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center'>
                <div className='p-2 rounded-lg bg-blue-100'>
                  <Building className='w-6 h-6 text-blue-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>
                    Properties
                  </p>
                  <p className='text-2xl font-bold text-gray-900'>12</p>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center'>
                <div className='p-2 rounded-lg bg-green-100'>
                  <Users className='w-6 h-6 text-green-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Tenants</p>
                  <p className='text-2xl font-bold text-gray-900'>28</p>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center'>
                <div className='p-2 rounded-lg bg-purple-100'>
                  <DollarSign className='w-6 h-6 text-purple-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Revenue</p>
                  <p className='text-2xl font-bold text-gray-900'>$45,600</p>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <div className='flex items-center'>
                <div className='p-2 rounded-lg bg-red-100'>
                  <AlertTriangle className='w-6 h-6 text-red-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Issues</p>
                  <p className='text-2xl font-bold text-gray-900'>3</p>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-4'>Recent Activities</h3>
              <div className='text-center py-8'>
                <div className='text-gray-400 mb-4'>
                  <Activity className='w-12 h-12 mx-auto' />
                </div>
                <p className='text-gray-500'>Coming Soon...</p>
                <p className='text-sm text-gray-400 mt-2'>
                  Activity feed will be implemented here
                </p>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-4'>Quick Actions</h3>
              <div className='space-y-3'>
                <button className='w-full text-left p-3 rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-colors flex items-center'>
                  <Plus className='w-4 h-4 mr-2' />
                  Add New Property
                </button>
                <button className='w-full text-left p-3 rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-colors flex items-center'>
                  <Plus className='w-4 h-4 mr-2' />
                  Add New Tenant
                </button>
                <button className='w-full text-left p-3 rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-colors flex items-center'>
                  <Plus className='w-4 h-4 mr-2' />
                  Record Payment
                </button>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-4'>Test Actions</h3>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center'
            >
              <LogOut className='w-4 h-4 mr-2' />
              Sign Out
            </button>
          </div>
        </div>
      </PropertyLayout>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const token = session.accessToken;

  let userInfo = null;

  try {
    userInfo = await PropertyApi.getUserInfo(token);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }

  return {
    props: {
      userInfo: userInfo || null,
      accessToken: token,
    },
  };
};
