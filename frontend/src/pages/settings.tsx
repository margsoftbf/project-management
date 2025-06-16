import type React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, signOut } from 'next-auth/react';
import PropertyLayout from '@/components/layout/PropertyLayout';
import { PropertyApi } from '@/lib/api';
import {
  Bell,
  Shield,
  Database,
  Trash2,
  Download,
  Key,
  Smartphone,
  Monitor,
  Save,
  AlertTriangle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export interface SettingsProps {
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

const SettingsPage = ({ userInfo }: SettingsProps) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: userInfo?.marketingConsent || false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password updated successfully!');
    } catch {
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTwoFactorEnabled(true);
      toast.success('Two-factor authentication has been enabled!');
    } catch {
      toast.error('Failed to enable 2FA. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      toast.success('Your data export will be emailed to you shortly.');
    } catch {
      toast.error('Failed to start data export.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      toast.error(
        'Account deletion requested. Your account will be deleted within 30 days.'
      );
      setTimeout(() => {
        signOut({ callbackUrl: '/login' });
      }, 3000);
    } catch {
      toast.error('Failed to delete account. Please contact support.');
    }
  };

  return (
    <>
      <Head>
        <title>Settings - Property Manager</title>
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
        <div className='space-y-6 max-w-7xl mx-auto'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                  Settings
                </h1>
                <p className='text-gray-600 mt-2'>
                  Manage your application preferences and security settings
                </p>
              </div>
              <Button
                onClick={handleSavePreferences}
                disabled={isLoading}
                className='flex items-center gap-2'
              >
                <Save className='w-4 h-4' />
                {isLoading ? 'Saving...' : 'Save All'}
              </Button>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Bell className='w-5 h-5' />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Email Notifications</Label>
                    <p className='text-sm text-gray-500'>
                      Receive notifications about payments, issues, and updates
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('emailNotifications', checked)
                    }
                  />
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>SMS Notifications</Label>
                    <p className='text-sm text-gray-500'>
                      Receive urgent notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('smsNotifications', checked)
                    }
                  />
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Push Notifications</Label>
                    <p className='text-sm text-gray-500'>
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('pushNotifications', checked)
                    }
                  />
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Marketing Emails</Label>
                    <p className='text-sm text-gray-500'>
                      Receive newsletters and product updates
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange('marketingEmails', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Shield className='w-5 h-5' />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <form onSubmit={handlePasswordUpdate} className='space-y-4'>
                  <h4 className='font-medium'>Change Password</h4>

                  <div className='space-y-2'>
                    <Label htmlFor='currentPassword'>Current Password</Label>
                    <div className='relative'>
                      <Input
                        id='currentPassword'
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            'currentPassword',
                            e.target.value
                          )
                        }
                        placeholder='Enter current password'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8'
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='newPassword'>New Password</Label>
                    <div className='relative'>
                      <Input
                        id='newPassword'
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          handlePasswordChange('newPassword', e.target.value)
                        }
                        placeholder='Enter new password'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='confirmPassword'>
                      Confirm New Password
                    </Label>
                    <Input
                      id='confirmPassword'
                      type='password'
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange('confirmPassword', e.target.value)
                      }
                      placeholder='Confirm new password'
                    />
                  </div>

                  <Button
                    type='submit'
                    disabled={
                      isLoading ||
                      !passwordData.currentPassword ||
                      !passwordData.newPassword
                    }
                  >
                    Update Password
                  </Button>
                </form>

                <Separator />

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h4 className='font-medium'>Two-Factor Authentication</h4>
                      <p className='text-sm text-gray-500'>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      {twoFactorEnabled ? (
                        <Badge variant='default'>Enabled</Badge>
                      ) : (
                        <Badge variant='secondary'>Disabled</Badge>
                      )}
                    </div>
                  </div>

                  {!twoFactorEnabled ? (
                    <Button
                      onClick={handleEnable2FA}
                      disabled={isLoading}
                      className='flex items-center gap-2'
                    >
                      <Smartphone className='w-4 h-4' />
                      Enable 2FA
                    </Button>
                  ) : (
                    <div className='space-y-2'>
                      <p className='text-sm text-green-600'>
                        ✓ Two-factor authentication is active
                      </p>
                      <Button
                        variant='outline'
                        className='flex items-center gap-2'
                      >
                        <Key className='w-4 h-4' />
                        View Backup Codes
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h4 className='font-medium'>Active Sessions</h4>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div className='flex items-center gap-3'>
                        <Monitor className='w-5 h-5 text-gray-400' />
                        <div>
                          <p className='font-medium text-sm'>Current Session</p>
                          <p className='text-xs text-gray-500'>
                            Chrome on Windows • Katowice, Poland
                          </p>
                        </div>
                      </div>
                      <Badge variant='default' className='text-xs'>
                        Active
                      </Badge>
                    </div>

                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div className='flex items-center gap-3'>
                        <Smartphone className='w-5 h-5 text-gray-400' />
                        <div>
                          <p className='font-medium text-sm'>Mobile App</p>
                          <p className='text-xs text-gray-500'>
                            iPhone • Last seen 2 hours ago
                          </p>
                        </div>
                      </div>
                      <Button variant='outline' size='sm'>
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Database className='w-5 h-5' />
                Data & Privacy
              </CardTitle>
              <CardDescription>
                Manage your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium'>Export Your Data</h4>
                    <p className='text-sm text-gray-500'>
                      Download a copy of all your data
                    </p>
                  </div>
                  <Button
                    onClick={handleExportData}
                    variant='outline'
                    className='flex items-center gap-2'
                  >
                    <Download className='w-4 h-4' />
                    Export Data
                  </Button>
                </div>

                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium text-red-600'>Delete Account</h4>
                    <p className='text-sm text-gray-500'>
                      Permanently delete your account and all data
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='destructive'
                        className='flex items-center gap-2'
                      >
                        <Trash2 className='w-4 h-4' />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='flex items-center gap-2'>
                          <AlertTriangle className='w-5 h-5 text-red-500' />
                          Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                          <br />
                          <br />
                          All your properties, tenants, payments, and other data
                          will be lost forever.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className='bg-red-600 hover:bg-red-700'
                        >
                          Yes, Delete My Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PropertyLayout>
    </>
  );
};

export default SettingsPage;

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
