import type React from 'react';
import { Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfoProps } from '@/types/types';


const ProfileAvatar = ({ userInfo }: UserInfoProps) => {
  const getUserInitials = () => {
    const name = `${userInfo?.firstName} ${userInfo?.lastName}`;
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Camera className='w-5 h-5' />
          Profile Picture
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar className='h-32 w-32 border-4 border-gray-200'>
            <AvatarImage
              src={userInfo?.avatarUrl || undefined}
              alt='Profile picture'
            />
            <AvatarFallback className='bg-blue-600 text-white text-2xl font-medium'>
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className='text-center space-y-2'>
            <Button
              type='button'
              variant='outline'
              className='flex items-center gap-2'
            >
              <Upload className='w-4 h-4' />
              Upload new picture
            </Button>
            <p className='text-sm text-gray-500'>
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAvatar;
