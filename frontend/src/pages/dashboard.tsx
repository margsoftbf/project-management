import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, signOut } from 'next-auth/react';
import PropertyLayout from '@/components/layout/PropertyLayout';
import { PropertyApi } from '@/lib/api';

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
        <title>PropertyManager - Dashboard</title>
      </Head>
      <PropertyLayout role={userInfo?.role || 'landlord'} userInfo={userInfo}>
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
                  <svg
                    className='w-6 h-6 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 012-2h2a2 2 0 012 2v4'
                    />
                  </svg>
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
                  <svg
                    className='w-6 h-6 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
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
                  <svg
                    className='w-6 h-6 text-purple-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                    />
                  </svg>
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
                  <svg
                    className='w-6 h-6 text-red-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                    />
                  </svg>
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
                  <svg
                    className='w-12 h-12 mx-auto'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                    />
                  </svg>
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
                <button className='w-full text-left p-3 rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-colors'>
                  + Add New Property
                </button>
                <button className='w-full text-left p-3 rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-colors'>
                  + Add New Tenant
                </button>
                <button className='w-full text-left p-3 rounded border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-colors'>
                  + Record Payment
                </button>
              </div>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-4'>Test Actions</h3>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
            >
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
