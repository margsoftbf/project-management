import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Users,
  ChartBar,
  Briefcase,
  Home,
  TrendingUp,
} from 'lucide-react';

export function ForWhom() {
  const [activeType, setActiveType] = useState<string>('property-owners');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const userTypes = [
    {
      id: 'property-owners',
      title: 'Property Owners',
      icon: <Building strokeWidth={1.5} />,
      description:
        'Individuals who own one or more properties and need a simple way to manage them.',
    },
    {
      id: 'property-managers',
      title: 'Property Managers',
      icon: <Users strokeWidth={1.5} />,
      description:
        'Professionals who manage properties on behalf of owners with multiple units or buildings.',
    },
    {
      id: 'real-estate',
      title: 'Real Estate Agencies',
      icon: <Briefcase strokeWidth={1.5} />,
      description:
        'Agencies looking to streamline property management as part of their service offerings.',
    },
    {
      id: 'landlords',
      title: 'Landlords',
      icon: <Home strokeWidth={1.5} />,
      description:
        'Residential landlords looking to simplify tenant management and rent collection.',
    },
    {
      id: 'investors',
      title: 'Property Investors',
      icon: <TrendingUp strokeWidth={1.5} />,
      description:
        'Investors with a portfolio of properties seeking to maximize returns through better management.',
    },
    {
      id: 'admins',
      title: 'Building Administrators',
      icon: <ChartBar strokeWidth={1.5} />,
      description:
        'Administrators responsible for maintenance and service management in larger buildings.',
    },
  ];

  return (
    <section
      id='for-whom'
      className='w-full py-24 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative'>
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -left-40 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -right-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl'></div>
          <div className='absolute top-1/4 right-1/4 w-64 h-64 bg-blue-700/5 rounded-full blur-3xl'></div>
        </div>

        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className='text-center mb-16'
          >
            <span className='inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-sm font-medium rounded-full mb-4 backdrop-blur-sm border border-blue-800/30'>
              Designed For You
            </span>
            <h2 className='text-3xl sm:text-4xl font-medium tracking-tight mb-4'>
              Who can benefit from PropertyManager?
            </h2>
            <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
              Our platform is designed to help various property professionals
              streamline their operations and improve efficiency.
            </p>
          </motion.div>

          <div className='flex flex-wrap justify-center gap-3 mb-16'>
            {userTypes.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative group`}
                onClick={() => setActiveType(type.id)}
              >
                <div
                  className={`p-4 sm:p-5 flex items-center space-x-3 sm:space-x-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                    activeType === type.id
                      ? 'bg-blue-900/40 border border-blue-700/70'
                      : 'bg-gray-900/80 border border-gray-800/70 hover:bg-gray-800/80'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-300 ${
                      activeType === type.id
                        ? 'bg-blue-800/60 text-blue-300'
                        : 'bg-gray-800/60 text-gray-400 group-hover:text-gray-300'
                    }`}
                  >
                    {type.icon}
                  </div>
                  <span
                    className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                      activeType === type.id
                        ? 'text-blue-300'
                        : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {type.title}
                  </span>
                </div>
                {activeType === type.id && (
                  <motion.div
                    layoutId='activeIndicator'
                    className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-12 h-1 bg-blue-500 rounded-full'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className='relative'>
            <AnimatePresence mode='wait'>
              {userTypes.map(
                (type) =>
                  activeType === type.id && (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className='grid md:grid-cols-2 gap-x-12 gap-y-8 items-start'
                    >
                      <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent blur-xl -m-4 rounded-2xl opacity-50'></div>
                        <div className='relative backdrop-blur-sm bg-gray-900/70 p-6 md:p-8 rounded-xl border border-gray-800/70'>
                          <div className='flex items-center mb-6'>
                            <div className='mr-4 p-2.5 rounded-lg bg-blue-900/30 border border-blue-800/30'>
                              {type.icon}
                            </div>
                            <h3 className='text-2xl font-medium text-white'>
                              {type.title}
                            </h3>
                          </div>

                          <p className='text-gray-300 mb-8 leading-relaxed'>
                            {type.description}
                          </p>

                          <h4 className='text-lg font-medium text-white mb-4 flex items-center'>
                            <span className='w-8 h-0.5 bg-blue-600 mr-3'></span>
                            Key features
                          </h4>

                          <ul className='space-y-4'>
                            {getFeaturesList(type.id).map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className='flex items-start group'
                              >
                                <div className='flex-shrink-0 h-6 w-6 rounded-md bg-blue-900/40 border border-blue-800/50 p-1 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-800/50 transition-colors duration-300'>
                                  <svg
                                    className='h-3 w-3 text-blue-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='M5 13l4 4L19 7'
                                    />
                                  </svg>
                                </div>
                                <span className='text-gray-300 group-hover:text-white transition-colors duration-300'>
                                  {feature}
                                </span>
                              </motion.li>
                            ))}
                          </ul>

                          <div className='mt-10'>
                            <a
                              href='/register'
                              className='inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group'
                            >
                              <span>Get started</span>
                              <span className='relative ml-2 w-6 h-6 flex items-center justify-center'>
                                <span className='absolute w-5 h-0.5 bg-blue-400 group-hover:translate-x-1 transition-transform duration-300'></span>
                                <span className='absolute right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 transform rotate-45 translate-x-0 group-hover:translate-x-1 transition-transform duration-300'></span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className='flex flex-col space-y-8'>
                        <div className='backdrop-blur-sm bg-gray-900/70 p-6 md:p-8 rounded-xl border border-gray-800/70 h-full'>
                          <div className='flex items-center mb-6'>
                            <div className='w-8 h-8 rounded-full bg-blue-900/40 border border-blue-800/50 p-1.5 mr-3 flex items-center justify-center'>
                              <svg
                                className='text-blue-400'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='1.5'
                                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                                />
                              </svg>
                            </div>
                            <h3 className='text-lg font-medium text-white'>
                              Customized for your needs
                            </h3>
                          </div>
                          <p className='text-gray-300 leading-relaxed'>
                            Our platform adapts to the specific requirements of{' '}
                            {type.title.toLowerCase()}, providing the tools you
                            need for your specific property management scenario.
                          </p>

                          <div className='mt-8 grid grid-cols-2 gap-4'>
                            <div className='p-4 rounded-lg bg-blue-900/20 border border-blue-800/30'>
                              <div className='text-2xl text-blue-400 font-bold mb-1'>
                                93%
                              </div>
                              <div className='text-sm text-gray-400'>
                                Time saved on administrative tasks
                              </div>
                            </div>
                            <div className='p-4 rounded-lg bg-blue-900/20 border border-blue-800/30'>
                              <div className='text-2xl text-blue-400 font-bold mb-1'>
                                45%
                              </div>
                              <div className='text-sm text-gray-400'>
                                Increase in communication efficiency
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='backdrop-blur-sm bg-gray-900/70 p-6 md:p-8 rounded-xl border border-gray-800/70 h-full relative overflow-hidden'>
                          <div className='absolute top-0 right-0 w-24 h-24 -translate-y-8 translate-x-8'>
                            <svg
                              width='100%'
                              height='100%'
                              viewBox='0 0 100 100'
                              fill='none'
                            >
                              <path
                                d='M100 0v100H0C0 44.8 44.8 0 100 0z'
                                fill='rgb(30 58 138 / 0.2)'
                              />
                            </svg>
                          </div>

                          <blockquote className='relative z-10'>
                            <svg
                              className='h-10 w-10 text-blue-900/60 absolute -top-1 -left-1'
                              fill='currentColor'
                              viewBox='0 0 32 32'
                            >
                              <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
                            </svg>

                            <p className='text-gray-300 relative z-10 text-sm mt-8 ml-6 leading-relaxed'>
                              PropertyManager has transformed how I manage my
                              properties. The streamlined interface and
                              comprehensive features have saved me countless
                              hours of work.
                            </p>

                            <footer className='mt-6'>
                              <div className='flex items-center'>
                                <div className='h-12 w-12 rounded-lg overflow-hidden relative mr-4 border-2 border-blue-800/50'>
                                  <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold'>
                                    {getInitials(getTestimonialName(type.id))}
                                  </div>
                                </div>
                                <div>
                                  <p className='font-medium text-white'>
                                    {getTestimonialName(type.id)}
                                  </p>
                                  <p className='text-sm text-gray-400'>
                                    {getTestimonialTitle(type.id)}
                                  </p>
                                </div>
                              </div>
                            </footer>
                          </blockquote>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function getFeaturesList(userType: string): string[] {
  switch (userType) {
    case 'property-owners':
      return [
        'Centralized property information management',
        'Automated rent collection and tracking',
        'Maintenance request system',
        'Document storage and organization',
        'Financial reporting and analysis',
      ];
    case 'property-managers':
      return [
        'Multi-property portfolio management',
        'Tenant screening and onboarding',
        'Task automation and scheduling',
        'Vendor coordination tools',
        'Client reporting and communication',
      ];
    case 'real-estate':
      return [
        'Property listing and marketing tools',
        'Client communication portal',
        'Transaction management',
        'Service package offerings',
        'Integration with popular real estate platforms',
      ];
    case 'landlords':
      return [
        'Lease agreement management',
        'Tenant screening and selection',
        'Online rent collection',
        'Maintenance tracking',
        'Legal compliance tools',
      ];
    case 'investors':
      return [
        'Property performance analytics',
        'ROI and financial tracking',
        'Portfolio growth opportunities',
        'Market trend analysis',
        'Tax and expense management',
      ];
    case 'admins':
      return [
        'Building maintenance scheduling',
        'Service request management',
        'Vendor coordination',
        'Resident communication tools',
        'Building inspection tracking',
      ];
    default:
      return [];
  }
}

function getTestimonialName(userType: string): string {
  switch (userType) {
    case 'property-owners':
      return 'Sarah Johnson';
    case 'property-managers':
      return 'Michael Rodriguez';
    case 'real-estate':
      return 'Emily Chen';
    case 'landlords':
      return 'David Thompson';
    case 'investors':
      return 'Anna Patel';
    case 'admins':
      return 'Robert Wilson';
    default:
      return 'John Doe';
  }
}

function getTestimonialTitle(userType: string): string {
  switch (userType) {
    case 'property-owners':
      return 'Owner of 5 rental properties';
    case 'property-managers':
      return 'Property Manager, Eastside Properties';
    case 'real-estate':
      return 'Real Estate Agent, Modern Homes Realty';
    case 'landlords':
      return 'Landlord with 12 apartment units';
    case 'investors':
      return 'Property Investment Portfolio Manager';
    case 'admins':
      return 'Building Administrator, Grand Towers';
    default:
      return 'Property Professional';
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('');
}
