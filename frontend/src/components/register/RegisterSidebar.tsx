export default function AuthSidebar() {
  const features = [
    'Centralize property information',
    'Automate rent collection',
    'Manage maintenance requests',
    'Store important documents',
  ];

  return (
    <div className='hidden lg:block relative lg:w-1/2'>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700'>
        <div className='absolute inset-0 bg-black opacity-20'></div>
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
              {features.map((feature, index) => (
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
  );
}
