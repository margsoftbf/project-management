import { useId } from 'react';
import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { Building, Key, ChartBar, ClipboardList } from 'lucide-react';
import phoneFrame from '@/svg/phone-frame.svg';

export function Hero() {
  return (
    <div className='overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36'>
      <div className='lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20'>
        <div className='relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6'>
          <h1 className='text-4xl font-medium tracking-tight text-gray-900'>
            <span className='block font-light text-blue-800'>Property</span>
            <span className='block font-bold text-blue-600'>Management</span>
            <span className='mt-3 block text-2xl'>Simplified.</span>
          </h1>
          <p className='mt-6 text-lg text-gray-600'>
            Streamline your property management with our all-in-one solution.
            Track rentals, maintenance requests, and finances all in one place.
            Perfect for landlords, property managers, and real estate
            professionals.
          </p>
          <div className='mt-8 flex flex-wrap gap-x-6 gap-y-4'>
            <Button href='/properties'>Get Started</Button>
            <Button href='/demo' variant='outline'>
              <PlayIcon className='h-6 w-6 flex-none' />
              <span className='ml-2.5'>Watch the demo</span>
            </Button>
          </div>
        </div>
        <div className='relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6'>
          <BackgroundIllustration className='absolute top-4 left-1/2 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0' />
          <div className='-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32'>
            <PhoneWithDemo />
          </div>
        </div>
        <div className='relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6'>
          <p className='text-center text-sm font-semibold text-gray-900 lg:text-left'>
            Trusted by property professionals worldwide
          </p>
          <ul
            role='list'
            className='mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start'
          >
            {[
              ['Professional', 'Real Estate Agencies'],
              ['Individual', 'Property Owners'],
              ['Property', 'Management Companies'],
              ['Residential', 'Landlords'],
              ['Commercial', 'Property Investors'],
            ].map(([name, description]) => (
              <li
                key={name}
                className='flex flex-col items-center lg:items-start'
              >
                <span className='font-medium text-blue-600'>{name}</span>
                <span className='text-xs text-gray-500'>{description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  const id = useId();

  return (
    <div {...props}>
      <svg
        viewBox='0 0 1026 1026'
        fill='none'
        aria-hidden='true'
        className='absolute inset-0 h-full w-full animate-spin-slow'
      >
        <path
          d='M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z'
          stroke='#D4D4D4'
          strokeOpacity='0.7'
        />

        <path
          d='M513 1025C230.23 1025 1 795.77 1 513'
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap='round'
          strokeWidth='1.5'
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1='1'
            y1='513'
            x2='1'
            y2='1025'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3b82f6' />
            <stop offset='1' stopColor='#3b82f6' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>

      <svg
        viewBox='0 0 1026 1026'
        fill='none'
        aria-hidden='true'
        className='absolute inset-0 h-full w-full animate-spin-reverse-slower'
      >
        <path
          d='M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z'
          stroke='#D4D4D4'
          strokeOpacity='0.7'
        />

        <path
          d='M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513'
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap='round'
          strokeWidth='1.5'
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1='913'
            y1='513'
            x2='113'
            y2='913'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3b82f6' />
            <stop offset='1' stopColor='#3b82f6' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PhoneWithDemo() {
  return (
    <div className='relative aspect-[366/729] mx-auto max-w-[366px]'>
      <div className='absolute top-[calc(23/729*100%)] left-[calc(23/366*100%)] w-[calc(318/366*100%)] h-[calc(686/729*100%)] bg-white rounded-[calc(38/366*100%)/calc(38/729*100%)] overflow-hidden z-10'>
        <div className='bg-blue-600 text-white p-4 py-5 flex items-center justify-between shadow-md '>
          <div className='flex items-center mt-4'>
            <svg
              viewBox='0 0 24 24'
              className='h-6 w-6 mr-2'
              fill='currentColor'
            >
              <path d='M21 13v7a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h7v9a1 1 0 001 1h8z' />
              <path d='M14 2v9h9l-9-9z' />
            </svg>
            <span className='font-semibold text-xs md:text-lg'>
              PropertyManager
            </span>
          </div>
          <div className='flex space-x-2 mt-4'>
            <span className='h-1 w-1 md:w-1.5 md:h-1.5 rounded-full bg-white opacity-60'></span>
            <span className='h-1 w-1 md:w-1.5 md:h-1.5 rounded-full bg-white opacity-60'></span>
            <span className='h-1 w-1  md:w-1.5 md:h-1.5 rounded-full bg-white'></span>
          </div>
        </div>

        <div className='p-4 text-left'>
          <h2 className='text-lg font-semibold text-gray-900 mb-1'>
            Dashboard
          </h2>
          <p className='text-xs text-gray-500 mb-4'>Welcome back, Alex</p>

          <div className='grid grid-cols-4 gap-2 mb-6'>
            <div className='bg-blue-50 p-2 rounded-lg flex flex-col items-center'>
              <div className='bg-blue-100 p-1.5 rounded-md mb-1'>
                <Building className='h-5 w-5 text-blue-600' />
              </div>
              <span className='text-xs font-medium text-gray-700'>
                Properties
              </span>
            </div>
            <div className='bg-green-50 p-2 rounded-lg flex flex-col items-center'>
              <div className='bg-green-100 p-1.5 rounded-md mb-1'>
                <Key className='h-5 w-5 text-green-600' />
              </div>
              <span className='text-xs font-medium text-gray-700'>Leases</span>
            </div>
            <div className='bg-amber-50 p-2 rounded-lg flex flex-col items-center'>
              <div className='bg-amber-100 p-1.5 rounded-md mb-1'>
                <ChartBar className='h-5 w-5 text-amber-600' />
              </div>
              <span className='text-xs font-medium text-gray-700'>Reports</span>
            </div>
            <div className='bg-purple-50 p-2 rounded-lg flex flex-col items-center'>
              <div className='bg-purple-100 p-1.5 rounded-md mb-1'>
                <ClipboardList className='h-5 w-5 text-purple-600' />
              </div>
              <span className='text-xs font-medium text-gray-700'>Tasks</span>
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-100'>
            <div className='flex justify-between items-center mb-3'>
              <div className='text-left'>
                <h4 className='text-sm font-bold text-gray-900'>
                  Rental Overview
                </h4>
                <p className='text-xs text-gray-500'>Last updated: Today</p>
              </div>
              <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium'>
                Active
              </span>
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between text-sm border-b border-gray-100 pb-2'>
                <span className='text-gray-600'>Total Properties:</span>
                <span className='font-medium'>12</span>
              </div>
              <div className='flex justify-between text-sm border-b border-gray-100 pb-2'>
                <span className='text-gray-600'>Occupied Units:</span>
                <span className='font-medium'>10</span>
              </div>
              <div className='flex justify-between text-sm border-b border-gray-100 pb-2'>
                <span className='text-gray-600'>Vacancy Rate:</span>
                <span className='font-medium'>16.7%</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Monthly Revenue:</span>
                <span className='font-medium text-blue-600'>$24,500</span>
              </div>
            </div>
          </div>

          <div className='mt-4 bg-white rounded-lg p-4 shadow-sm border border-gray-100'>
            <h4 className='text-sm font-bold text-gray-900 mb-3'>
              Occupancy Rate
            </h4>
            <div className='w-full bg-gray-200 rounded-full h-2.5 mb-1'>
              <div
                className='bg-blue-600 h-2.5 rounded-full'
                style={{ width: '83.3%' }}
              ></div>
            </div>
            <div className='flex justify-between text-xs text-gray-500'>
              <span>0%</span>
              <span>83.3%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ramka telefonu */}
      <div className='absolute inset-0'>
        {phoneFrame && (
          <Image
            src={phoneFrame}
            alt='Phone frame'
            fill
            className='pointer-events-none z-20'
            priority
            unoptimized
          />
        )}
      </div>
    </div>
  );
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true' {...props}>
      <circle cx='12' cy='12' r='11.5' stroke='#D4D4D4' />
      <path
        d='M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z'
        fill='#A3A3A3'
        stroke='#A3A3A3'
      />
    </svg>
  );
}
