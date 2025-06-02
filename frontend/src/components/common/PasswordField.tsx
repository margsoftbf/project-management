import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showHelpText?: boolean;
}

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  showHelpText = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='relative'>
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={`block w-full px-4 py-3 pr-10 rounded-lg bg-gray-50 border ${
            error
              ? 'border-red-300 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-500'
          } shadow-sm focus:ring-2 focus:outline-none`}
        />
        <button
          type='button'
          className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className='h-5 w-5' />
          ) : (
            <Eye className='h-5 w-5' />
          )}
        </button>
      </div>
      {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
      {showHelpText && (
        <p className='mt-1.5 text-xs text-gray-500'>
          Password must be at least 8 characters and include uppercase,
          lowercase, and a number.
        </p>
      )}
    </div>
  );
}
