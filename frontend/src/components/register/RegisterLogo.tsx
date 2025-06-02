import { Building } from 'lucide-react';

export default function RegisterLogo() {
  return (
    <div
      className='inline-flex items-center cursor-pointer'
      onClick={() => (window.location.href = '/')}
    >
      <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
        <Building className='h-5 w-5 text-white' />
      </div>
      <span className='ml-2 text-xl font-semibold'>
        <span className='font-light text-blue-800'>
          Property<span className='font-semibold'>Manager</span>
        </span>
      </span>
    </div>
  );
}
