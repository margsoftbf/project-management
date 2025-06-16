import type React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}

interface ProfileUserInfo {
  emailVerified?: boolean;
}

interface PersonalInfoProps {
  formData: ProfileFormData;
  handleInputChange: (field: keyof ProfileFormData, value: string) => void;
  userInfo?: ProfileUserInfo | null;
}
const PersonalInfo = ({
  formData,
  handleInputChange,
  userInfo,
}: PersonalInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='w-5 h-5' />
          Personal Information
        </CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              id='firstName'
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder='Enter your first name'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id='lastName'
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder='Enter your last name'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email' className='flex items-center gap-2'>
            <Mail className='w-4 h-4' />
            Email Address
          </Label>
          <Input
            id='email'
            type='email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder='Enter your email address'
          />
          {!userInfo?.emailVerified && (
            <p className='text-sm text-amber-600'>
              ⚠️ Please verify your email address to secure your account
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone' className='flex items-center gap-2'>
            <Phone className='w-4 h-4' />
            Phone Number
          </Label>
          <Input
            id='phone'
            type='tel'
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder='Enter your phone number'
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
