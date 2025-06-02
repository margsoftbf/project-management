import { useRegisterForm } from '../hooks/useRegisterForm';
import RegisterSidebar from '@/components/register/RegisterSidebar';
import RegisterLogo from '@/components/register/RegisterLogo';
import InputField from '@/components/common/InputField';
import PasswordField from '@/components/common/PasswordField';
import ConsentCheckboxes from '@/components/register/ConsentCheckboxes';
import RoleSelector from '@/components/register/RoleSelector';

export default function Register() {
  const {
    formData,
    errors,
    isSubmitting,
    registerError,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <div className='flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2'>
        <div className='mx-auto w-full max-w-sm lg:max-w-lg'>
          <div className='mb-8'>
            <RegisterLogo />
          </div>

          <div>
            <h2 className='text-3xl font-bold text-gray-900'>
              Sign up for an account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Already registered?{' '}
              <span
                onClick={() => (window.location.href = '/login')}
                className='text-blue-600 hover:text-blue-500 cursor-pointer'
              >
                Sign in
              </span>{' '}
              to your account.
            </p>

            {registerError && (
              <div className='mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm'>
                {registerError}
              </div>
            )}

            <div className='mt-8 bg-white py-8 px-8 shadow-sm rounded-lg border border-gray-200'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <RoleSelector
                  selectedRole={formData.role}
                  onChange={handleChange}
                  error={errors.role}
                />

                <div className='grid grid-cols-2 gap-6'>
                  <InputField
                    label='First name'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <InputField
                    label='Last name'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                </div>

                <InputField
                  label='Email address'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <PasswordField
                  label='Password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  showHelpText={true}
                />

                <PasswordField
                  label='Confirm Password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />

                <ConsentCheckboxes
                  privacyConsent={formData.privacyConsent}
                  marketingConsent={formData.marketingConsent}
                  onChange={handleChange}
                  privacyError={errors.privacyConsent}
                />

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='mt-8 w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200'
                >
                  {isSubmitting ? 'Creating account...' : 'Get started today'}
                </button>

                <p className='mt-4 text-xs text-center text-gray-500'>
                  By signing up, you agree to our{' '}
                  <span className='text-blue-600 hover:text-blue-500 cursor-pointer'>
                    Terms of Service
                  </span>{' '}
                  and{' '}
                  <span className='text-blue-600 hover:text-blue-500 cursor-pointer'>
                    Privacy Policy
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <RegisterSidebar />
    </div>
  );
}
