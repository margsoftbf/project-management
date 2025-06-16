import type React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserInfoProps } from '@/types/types';
import { formatDate } from '@/utils/formatDate';

const AccountInformation = ({ userInfo }: UserInfoProps) => {
  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Shield className='w-5 h-5' />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-3 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-500'>User ID:</span>
            <span className='font-mono text-xs'>{userInfo?.slug}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Email Status:</span>
            {userInfo?.emailVerified ? (
              <Badge variant='default' className='text-xs'>
                Verified
              </Badge>
            ) : (
              <Badge variant='destructive' className='text-xs'>
                Not Verified
              </Badge>
            )}
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Account Status:</span>
            {userInfo?.isActive ? (
              <Badge variant='default' className='text-xs'>
                Active
              </Badge>
            ) : (
              <Badge variant='secondary' className='text-xs'>
                Inactive
              </Badge>
            )}
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Member Since:</span>
            <span className='text-xs'>
              {formatDate(userInfo?.createdAt || null)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Last Login:</span>
            <span className='text-xs'>
              {formatDate(userInfo?.lastLoginAt || null)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInformation;
