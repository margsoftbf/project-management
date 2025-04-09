import { useState } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Building, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    confirmPassword: z.string(),
    referralSource: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      referralSource: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      setRegisterError(null);

      console.log('Registration data:', data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError(
        error instanceof Error
          ? error.message
          : 'Failed to register. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <div className='flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2'>
        <div className='mx-auto w-full max-w-sm lg:max-w-md'>
          <div className='mb-8'>
            <Link href='/' className='inline-flex items-center'>
              <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
                <Building className='h-5 w-5 text-white' />
              </div>
              <span className='ml-2 text-xl font-semibold'>
                <span className='font-light text-blue-800'>
                  Property<span className='font-semibold'>Manager</span>
                </span>
              </span>
            </Link>
          </div>

          <div>
            <h2 className='text-3xl font-bold text-gray-900'>
              Sign up for an account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Already registered?{' '}
              <Link href='/login' className='text-blue-600 hover:text-blue-500'>
                Sign in
              </Link>{' '}
              to your account.
            </p>

            {registerError && (
              <div className='mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm'>
                {registerError}
              </div>
            )}

            <div className='mt-8 bg-white py-8 px-8 shadow-sm rounded-lg border border-gray-200'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='firstName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <input
                      id='firstName'
                      {...register('firstName')}
                      type='text'
                      autoComplete='given-name'
                      className={`block w-full px-4 py-3 rounded-lg bg-gray-50 ${
                        errors.firstName
                          ? 'border-red-300 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-blue-500'
                      } shadow-sm focus:ring-2 focus:outline-none`}
                    />
                    {errors.firstName && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <input
                      id='lastName'
                      {...register('lastName')}
                      type='text'
                      autoComplete='family-name'
                      className={`block w-full px-4 py-3 rounded-lg bg-gray-50 ${
                        errors.lastName
                          ? 'border-red-300 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-blue-500'
                      } shadow-sm focus:ring-2 focus:outline-none`}
                    />
                    {errors.lastName && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div className='col-span-full space-y-2'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <input
                      id='email'
                      {...register('email')}
                      type='email'
                      autoComplete='email'
                      className={`block w-full px-4 py-3 rounded-lg bg-gray-50 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-blue-500'
                      } shadow-sm focus:ring-2 focus:outline-none`}
                    />
                    {errors.email && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className='col-span-full space-y-2'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Password
                    </label>
                    <div className='relative'>
                      <input
                        id='password'
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        className={`block w-full px-4 py-3 pr-10 rounded-lg bg-gray-50 ${
                          errors.password
                            ? 'border-red-300 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        } shadow-sm focus:ring-2 focus:outline-none`}
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className='h-5 w-5' aria-hidden='true' />
                        ) : (
                          <Eye className='h-5 w-5' aria-hidden='true' />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className='col-span-full space-y-2'>
                    <label
                      htmlFor='confirmPassword'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Confirm Password
                    </label>
                    <div className='relative'>
                      <input
                        id='confirmPassword'
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        className={`block w-full px-4 py-3 pr-10 rounded-lg bg-gray-50 ${
                          errors.confirmPassword
                            ? 'border-red-300 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        } shadow-sm focus:ring-2 focus:outline-none`}
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-5 w-5' aria-hidden='true' />
                        ) : (
                          <Eye className='h-5 w-5' aria-hidden='true' />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    <p className='mt-1.5 text-xs text-gray-500'>
                      Password must be at least 8 characters and include
                      uppercase, lowercase, and a number.
                    </p>
                  </div>

                  <div className='col-span-full space-y-2'>
                    <label
                      htmlFor='referralSource'
                      className='block text-sm font-medium text-gray-700'
                    >
                      How did you hear about us?
                    </label>
                    <select
                      id='referralSource'
                      {...register('referralSource')}
                      className={`block w-full px-4 py-3 rounded-lg bg-gray-50 ${
                        errors.referralSource
                          ? 'border-red-300 focus:ring-red-400'
                          : 'border-gray-300 focus:ring-blue-500'
                      } shadow-sm focus:ring-2 focus:outline-none`}
                    >
                      <option value=''>Select an option</option>
                      <option value='search'>Web search</option>
                      <option value='social'>Social media</option>
                      <option value='friend'>Friend or colleague</option>
                      <option value='ad'>Advertisement</option>
                      <option value='other'>Other</option>
                    </select>
                    {errors.referralSource && (
                      <p className='mt-1 text-xs text-red-600'>
                        {errors.referralSource.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='mt-8 w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200'
                >
                  {isSubmitting ? 'Creating account...' : 'Get started today'}
                </button>

                <p className='mt-4 text-xs text-center text-gray-500'>
                  By signing up, you agree to our{' '}
                  <Link
                    href='/terms'
                    className='text-blue-600 hover:text-blue-500'
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='text-blue-600 hover:text-blue-500'
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden lg:block relative lg:w-1/2'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700'>
          <div className='absolute inset-0 bg-black opacity-20'>
          </div>

          <div className='absolute inset-0 flex flex-col justify-center items-start px-12'>
            <div className='max-w-md'>
              <h3 className='text-2xl font-semibold text-white'>
                Streamline your property management
              </h3>
              <p className='mt-4 text-lg text-white/90'>
                Join thousands of property managers who use PropertyManager to
                simplify their daily operations.
              </p>

              <div className='mt-8 space-y-4'>
                {[
                  'Centralize property information',
                  'Automate rent collection',
                  'Manage maintenance requests',
                  'Store important documents',
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
