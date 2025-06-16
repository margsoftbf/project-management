import type React from 'react';
import {
  Building,
  Key,
  BarChart,
  ClipboardList,
  Shield,
  Clock,
  CreditCard,
  Users,
} from 'lucide-react';

export function Features() {
  return (
    <section id='features' className='w-full py-20 bg-black text-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-20'>
          <span className='inline-block px-4 py-1.5 bg-blue-900/50 text-blue-400 text-sm font-medium rounded-full mb-4'>
            Powerful Features
          </span>
          <h2 className='text-3xl sm:text-4xl font-medium tracking-tight mb-4'>
            Everything you need to manage properties
          </h2>
          <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
            Our comprehensive suite of tools helps you streamline operations,
            increase efficiency, and boost your property management business.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16'>
          <FeatureItem
            icon={<Building className='h-6 w-6 text-blue-400' />}
            title='Property Tracking'
            description='Manage all your properties in one place with detailed information and status tracking.'
          />
          <FeatureItem
            icon={<Key className='h-6 w-6 text-blue-400' />}
            title='Lease Management'
            description='Create, store, and manage lease agreements with automated renewal notifications.'
          />
          <FeatureItem
            icon={<BarChart className='h-6 w-6 text-blue-400' />}
            title='Financial Reports'
            description='Generate comprehensive financial reports to track income, expenses, and profitability.'
          />
          <FeatureItem
            icon={<ClipboardList className='h-6 w-6 text-blue-400' />}
            title='Maintenance Tracking'
            description='Log and track maintenance requests from tenants with priority levels and status updates.'
          />
          <FeatureItem
            icon={<Shield className='h-6 w-6 text-blue-400' />}
            title='Secure Documents'
            description='Store and share important documents securely with role-based access controls.'
          />
          <FeatureItem
            icon={<Clock className='h-6 w-6 text-blue-400' />}
            title='Automated Reminders'
            description='Never miss important dates with automated reminders for payments, inspections, and more.'
          />
          <FeatureItem
            icon={<CreditCard className='h-6 w-6 text-blue-400' />}
            title='Payment Processing'
            description='Accept and track rent payments online with integrated payment processing solutions.'
          />
          <FeatureItem
            icon={<Users className='h-6 w-6 text-blue-400' />}
            title='Tenant Portal'
            description='Provide tenants with a dedicated portal to submit requests and access information.'
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className='group relative'>
      <div className='absolute -top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out'></div>

      <div className='flex items-center mb-3 group-hover:translate-y-[-2px] transition-transform duration-200'>
        <div className='p-2 rounded-md bg-blue-900/30 mr-3 group-hover:bg-blue-800/40 transition-colors duration-200'>
          {icon}
        </div>
        <h3 className='text-lg font-medium text-white group-hover:text-blue-400 transition-colors duration-200'>
          {title}
        </h3>
      </div>

      <p className='text-sm text-gray-400 pl-12'>{description}</p>
      <div className='absolute -bottom-5 left-0 w-16 h-px bg-blue-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out'></div>
    </div>
  );
}
