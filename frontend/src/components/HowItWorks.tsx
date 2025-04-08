import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  User,
  Building,
  FileText,
  CreditCard,
  Settings,
} from 'lucide-react';

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'owners' | 'tenants'>('owners');

  return (
    <section
      id='how-it-works'
      className='w-full py-24 bg-gray-50 overflow-hidden'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <span className='inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4'>
            Simple Process
          </span>
          <h2 className='text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-4'>
            How PropertyManager works
          </h2>
          <p className='max-w-2xl mx-auto text-gray-600 text-lg'>
            Get started in minutes with our streamlined setup process. Manage
            all your properties and tenants in one place.
          </p>
        </div>

        <div className='flex justify-center mb-16'>
          <div className='inline-flex p-1 bg-gray-100 rounded-full shadow-sm'>
            <button
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'owners'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('owners')}
            >
              For Property Owners
            </button>
            <button
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'tenants'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('tenants')}
            >
              For Tenants
            </button>
          </div>
        </div>

        {activeTab === 'owners' ? (
          <div className='grid md:grid-cols-3 gap-8 lg:gap-12'>
            <ProcessStep
              number='01'
              title='Register and add properties'
              description='Create your account and add your properties with all relevant details: addresses, units, amenities, and more.'
              icon={<Building className='h-8 w-8' strokeWidth={1.5} />}
            />
            <ProcessStep
              number='02'
              title='Invite and manage tenants'
              description='Add tenants to your properties, create lease agreements, and set up rent payment schedules.'
              icon={<User className='h-8 w-8' strokeWidth={1.5} />}
            />
            <ProcessStep
              number='03'
              title='Track finances and documents'
              description='Monitor rent payments, expenses, and store all property-related documents in one secure location.'
              icon={<FileText className='h-8 w-8' strokeWidth={1.5} />}
            />
          </div>
        ) : (
          <div className='grid md:grid-cols-3 gap-8 lg:gap-12'>
            <ProcessStep
              number='01'
              title='Create your tenant account'
              description='Sign up using the invitation from your property manager and set up your secure tenant profile.'
              icon={<User className='h-8 w-8' strokeWidth={1.5} />}
            />
            <ProcessStep
              number='02'
              title='Make payments online'
              description='Pay rent and other fees securely through the platform with multiple payment options.'
              icon={<CreditCard className='h-8 w-8' strokeWidth={1.5} />}
            />
            <ProcessStep
              number='03'
              title='Submit and track requests'
              description='Submit maintenance requests, track their status, and communicate directly with property management.'
              icon={<Settings className='h-8 w-8' strokeWidth={1.5} />}
            />
          </div>
        )}

        <div className='mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
            <h3 className='text-2xl font-medium text-gray-900 mb-4 md:mb-0'>
              {activeTab === 'owners'
                ? 'Benefits for property owners'
                : 'Benefits for tenants'}
            </h3>
            <a
              href={activeTab === 'owners' ? '/register' : '/tenant-signup'}
              className='inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm'
            >
              Get started now
              <ArrowRight className='ml-2 h-4 w-4' />
            </a>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {activeTab === 'owners' ? (
              <>
                <BenefitItem text='Save time with automated rent collection' />
                <BenefitItem text='Centralize all property documents' />
                <BenefitItem text='Reduce vacancy with better tenant management' />
                <BenefitItem text='Track maintenance requests efficiently' />
                <BenefitItem text='Generate professional financial reports' />
                <BenefitItem text='Improve tenant communication' />
              </>
            ) : (
              <>
                <BenefitItem text='Pay rent online with multiple payment options' />
                <BenefitItem text='Submit maintenance requests 24/7' />
                <BenefitItem text='Access important documents anytime' />
                <BenefitItem text='Receive timely notifications and updates' />
                <BenefitItem text='Communicate directly with property management' />
                <BenefitItem text='View payment history and receipts' />
              </>
            )}
          </div>

          <div className='mt-12 pt-8 border-t border-gray-100'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <div className='flex items-center mb-6 md:mb-0'>
                <div className='flex -space-x-2 mr-4'>
                  <div className='w-10 h-10 rounded-full border-2 border-white relative z-30'>
                    <Image
                      src='/images/avatars/avatar-1.png'
                      alt='User avatar'
                      width={40}
                      height={40}
                      className='w-full h-full rounded-full object-cover'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/avatar-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className='w-10 h-10 rounded-full border-2 border-white relative z-20'>
                    <Image
                      src='/images/avatars/avatar-2.png'
                      alt='User avatar'
                      width={40}
                      height={40}
                      className='w-full h-full rounded-full object-cover'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/avatar-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className='w-10 h-10 rounded-full border-2 border-white relative z-10'>
                    <Image
                      src='/images/avatars/avatar-3.png'
                      alt='User avatar'
                      width={40}
                      height={40}
                      className='w-full h-full rounded-full object-cover'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/avatar-placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Join 2,000+ users
                  </p>
                  <p className='text-xs text-gray-500'>
                    who trust PropertyManager
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className='w-5 h-5 text-yellow-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <span className='ml-2 text-sm font-medium text-gray-900'>
                    4.9/5
                  </span>
                </div>
                <span className='text-gray-300'>|</span>
                <span className='text-sm text-gray-600'>
                  Trusted since 2018
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ProcessStep({ number, title, description, icon }: ProcessStepProps) {
  return (
    <div className='relative p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group'>
      <div className='absolute -top-4 left-6 px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded'>
        {number}
      </div>
      <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-200'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200'>
        {title}
      </h3>
      <p className='text-gray-600 text-sm'>{description}</p>

      <div className='absolute h-2 w-2 right-6 top-1/2 transform -translate-y-1/2 rounded-full border-2 border-blue-600 md:block hidden'></div>
      <div className='absolute w-12 h-0.5 -right-12 top-1/2 transform -translate-y-1/2 bg-blue-200 md:block hidden'></div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className='flex items-center space-x-3 group'>
      <div className='flex-shrink-0 mt-1'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200'>
          <Check className='h-3 w-3 text-blue-600' />
        </div>
      </div>
      <p className='text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-[14px]'>
        {text}
      </p>
    </div>
  );
}
