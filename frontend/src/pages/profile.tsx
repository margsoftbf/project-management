import type React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import PropertyLayout from '@/components/layout/PropertyLayout';
import { PropertyApi } from '@/lib/api';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import { UserInfoProps } from '@/types/types';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import AccountInformation from '@/components/profile/AccountInformation';
import PersonalInfo from '@/components/profile/PersonalInfo';
import AddressInfo from '@/components/profile/AddressInfo';

const ProfilePage = ({ userInfo }: UserInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.phoneNumber || '',
    address: userInfo?.address || '',
    city: userInfo?.city || '',
    postalCode: userInfo?.postalCode || '',
  });

  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      admin: 'Administrator',
      landlord: 'Property Owner',
      tenant: 'Tenant',
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Profile - Property Manager</title>
      </Head>
      <PropertyLayout
        role={userInfo?.role || 'landlord'}
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
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                  Profile
                </h1>
                <p className='text-gray-600 mt-2'>
                  Manage your personal information and account details
                </p>
              </div>
              <Badge variant='secondary' className='capitalize'>
                {getRoleDisplayName(userInfo?.role || 'tenant')}
              </Badge>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-1'>
              <AccountInformation userInfo={userInfo} />
              <ProfileAvatar userInfo={userInfo} />
            </div>

            <div className='lg:col-span-2'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <PersonalInfo
                  formData={formData}
                  handleInputChange={handleInputChange}
                  userInfo={userInfo}
                />
                <AddressInfo
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                <div className='flex justify-end'>
                  <Button
                    type='submit'
                    disabled={isLoading}
                    className='flex items-center gap-2'
                  >
                    <Save className='w-4 h-4' />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PropertyLayout>
    </>
  );
};

export default ProfilePage;

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
