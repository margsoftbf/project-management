import RegisterLogo from '@/components/register/RegisterLogo';
import { useLoginForm } from '../hooks/useLoginForm';
import InputField from '@/components/common/InputField';
import PasswordField from '@/components/common/PasswordField';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useLoginForm();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <div className='flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2'>
        <div className='mx-auto w-full max-w-sm lg:max-w-md'>
          <div className='mb-8'>
            <RegisterLogo />
          </div>

          <div>
            <h2 className='text-3xl font-bold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Don&apos;t have an account?{' '}
              <span
                onClick={() => (window.location.href = '/register')}
                className='text-blue-600 hover:text-blue-500 cursor-pointer'
              >
                Sign up
              </span>{' '}
              for free.
            </p>

            <div className='mt-8 bg-white py-8 px-8 shadow-sm rounded-lg border border-gray-200'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <InputField
                  label='Email address'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <div className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Password
                    </label>
                    <span className='text-sm text-blue-600 hover:text-blue-500 cursor-pointer'>
                      Forgot password?
                    </span>
                  </div>
                  <PasswordField
                    label=''
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                </div>

                <div className='flex items-center'>
                  <input
                    name='rememberMe'
                    type='checkbox'
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label className='ml-2 block text-sm text-gray-700'>
                    Remember me
                  </label>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='mt-8 w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200'
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden lg:block relative lg:w-1/2'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700'>
          <div className='absolute inset-0 bg-black opacity-20'></div>
          <div className='absolute inset-0 flex flex-col justify-center items-start px-12'>
            <div className='max-w-md'>
              <h3 className='text-2xl font-semibold text-white'>
                Welcome back to PropertyManager
              </h3>
              <p className='mt-4 text-lg text-white/90'>
                Log in to access your dashboard and manage your properties
                efficiently.
              </p>

              <div className='mt-8 space-y-4'>
                {[
                  'Access all your properties',
                  'View tenant information',
                  'Track payments and expenses',
                  'Manage maintenance requests',
                ].map((feature, index) => (
                  <div key={index} className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <div className='h-6 w-6 rounded-full bg-blue-500/30 flex items-center justify-center'>
                        <svg
                          className='h-4 w-4 text-white'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                    </div>
                    <p className='ml-3 text-white'>{feature}</p>
                  </div>
                ))}
              </div>

              <div className='mt-12'>
                <div className='flex items-center'>
                  <div className='flex -space-x-2'>
                    {['JD', 'ML', 'KS'].map((initials, i) => (
                      <div
                        key={i}
                        className='inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden'
                      >
                        <div className='h-full w-full bg-blue-400/50 flex items-center justify-center text-white text-sm font-bold'>
                          {initials}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='ml-4 text-white'>
                    <p className='text-sm font-medium'>
                      Trusted by 2,000+ property professionals
                    </p>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className='h-4 w-4 text-yellow-300'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      ))}
                      <span className='ml-2 text-sm text-white/90'>4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
