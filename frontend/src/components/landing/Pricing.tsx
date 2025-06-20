import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Star } from 'lucide-react';

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const [highlightedPlan, setHighlightedPlan] =
    useState<string>('professional');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'For property owners managing single properties',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        { name: 'Up to 3 properties', included: true },
        { name: 'Rent collection', included: true },
        { name: 'Document storage', included: true },
        { name: 'Basic maintenance requests', included: true },
        { name: 'Email support', included: true },
        { name: 'Financial reporting', included: false },
        { name: 'Tenant screening', included: false },
        { name: 'Custom branding', included: false },
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For active landlords with multiple properties',
      monthlyPrice: 49,
      yearlyPrice: 490,
      popular: true,
      features: [
        { name: 'Up to 15 properties', included: true },
        { name: 'Rent collection', included: true },
        { name: 'Document storage', included: true },
        { name: 'Advanced maintenance requests', included: true },
        { name: 'Priority email & phone support', included: true },
        { name: 'Financial reporting', included: true },
        { name: 'Tenant screening', included: true },
        { name: 'Custom branding', included: false },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For property managers and large portfolios',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { name: 'Unlimited properties', included: true },
        { name: 'Rent collection', included: true },
        { name: 'Document storage', included: true },
        { name: 'Advanced maintenance requests', included: true },
        { name: 'Priority 24/7 support', included: true },
        { name: 'Financial reporting', included: true },
        { name: 'Tenant screening', included: true },
        { name: 'Custom branding', included: true },
      ],
    },
  ];

  return (
    <section id='pricing' className='w-full py-24 bg-white overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative'>
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-40 -left-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-70'></div>
          <div className='absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50'></div>
        </div>

        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className='text-center mb-16'
          >
            <span className='inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4'>
              Pricing Plans
            </span>
            <h2 className='text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-4'>
              Choose the right plan for your needs
            </h2>
            <p className='max-w-2xl mx-auto text-gray-600 text-lg'>
              We offer flexible pricing options to accommodate property owners
              and managers of all sizes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='flex justify-center mb-12'
          >
            <div className='inline-flex p-1 bg-gray-100 rounded-full shadow-sm'>
              <button
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly Billing
                {billingPeriod === 'monthly' && (
                  <motion.span
                    layoutId='billingIndicator'
                    className='absolute bottom-0 left-0 right-0 h-full rounded-full'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
              <button
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  billingPeriod === 'yearly'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod('yearly')}
              >
                Yearly Billing
                {billingPeriod === 'yearly' && (
                  <motion.div
                    layoutId='billingIndicator'
                    className='absolute bottom-0 left-0 right-0 h-full rounded-full'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className='absolute -top-3 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-500 text-white'>
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                onClick={() => setHighlightedPlan(plan.id)}
                className={`relative rounded-2xl transition-all duration-300 cursor-pointer ${
                  highlightedPlan === plan.id
                    ? 'border-2 border-gray-800 bg-gray-900 shadow-xl scale-105 z-10'
                    : 'border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200'
                }`}
              >
                {plan.popular && (
                  <div className='absolute -top-5 inset-x-0 flex justify-center'>
                    <span className='px-4 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-md'>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className='p-8'>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      highlightedPlan === plan.id
                        ? 'text-white'
                        : 'text-gray-900'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 ${
                      highlightedPlan === plan.id
                        ? 'text-gray-300'
                        : 'text-gray-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className='flex items-baseline mb-8'>
                    <span
                      className={`text-4xl font-bold ${
                        highlightedPlan === plan.id
                          ? 'text-white'
                          : 'text-gray-900'
                      }`}
                    >
                      $
                      {billingPeriod === 'monthly'
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                    </span>
                    <span
                      className={`ml-2 ${
                        highlightedPlan === plan.id
                          ? 'text-gray-300'
                          : 'text-gray-500'
                      }`}
                    >
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium mb-8 transition-all duration-200 ${
                      highlightedPlan === plan.id
                        ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    Select {plan.name}
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </motion.button>

                  <div className='space-y-4'>
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + featureIndex * 0.05,
                        }}
                        className='flex items-start'
                      >
                        <div className='flex-shrink-0 h-5 w-5 mt-1'>
                          {feature.included ? (
                            <div className='h-5 w-5 rounded-full bg-green-100 flex items-center justify-center'>
                              <Check className='h-3 w-3 text-green-600' />
                            </div>
                          ) : (
                            <div className='h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center'>
                              <X className='h-3 w-3 text-gray-400' />
                            </div>
                          )}
                        </div>
                        <span
                          className={`ml-3 text-sm ${
                            highlightedPlan === plan.id
                              ? feature.included
                                ? 'text-gray-200'
                                : 'text-gray-500'
                              : feature.included
                              ? 'text-gray-700'
                              : 'text-gray-400'
                          }`}
                        >
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='mt-20 bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100'
          >
            <div className='flex flex-col md:flex-row md:items-center'>
              <div className='md:w-2/3 mb-8 md:mb-0'>
                <div className='flex items-center mb-4'>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <Star
                        key={index}
                        className='h-5 w-5 text-yellow-400 fill-current'
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <span className='ml-2 text-sm font-medium text-gray-900'>
                    4.9/5 • 500+ reviews
                  </span>
                </div>
                <h3 className='text-2xl font-medium text-gray-900 mb-3'>
                  Need a custom solution for your business?
                </h3>
                <p className='text-gray-600'>
                  We offer custom enterprise solutions for property management
                  companies and large portfolios. Contact our sales team to
                  discuss your specific requirements.
                </p>
              </div>
              <div className='md:w-1/3 md:text-right'>
                <motion.a
                  href='/contact'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm'
                >
                  Contact Sales
                  <ArrowRight className='ml-2 h-4 w-4' />
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

