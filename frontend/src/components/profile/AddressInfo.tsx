import type React from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AddressInfoProps {
  formData: ProfileFormData;
  handleInputChange: (field: string, value: string) => void;
}

const AddressInfo = ({ formData, handleInputChange }: AddressInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MapPin className='w-5 h-5' />
          Address Information
        </CardTitle>
        <CardDescription>
          Update your address and location details
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='address'>Street Address</Label>
          <Textarea
            id='address'
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder='Enter your street address'
            rows={2}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='city'>City</Label>
            <Input
              id='city'
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder='Enter your city'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='postalCode'>Postal Code</Label>
            <Input
              id='postalCode'
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder='Enter your postal code'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressInfo;

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}
