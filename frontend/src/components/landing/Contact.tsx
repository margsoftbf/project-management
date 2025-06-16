import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

export function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id='contact'
      className='w-full py-24 bg-gray-900 text-white overflow-hidden'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative'>
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/4 -left-40 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl'></div>
          <div className='absolute bottom-1/4 -right-40 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl'></div>
          <div className='absolute top-1/2 left-1/3 w-60 h-60 bg-blue-700/10 rounded-full blur-3xl'></div>
        </div>

        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className='text-center mb-16'
          >
            <span className='inline-block px-4 py-1.5 bg-blue-900/30 text-blue-400 text-sm font-medium rounded-full mb-4 backdrop-blur-sm border border-blue-800/30'>
              Get In Touch
            </span>
            <h2 className='text-3xl sm:text-4xl font-medium tracking-tight mb-4'>
              Contact our team
            </h2>
            <p className='max-w-2xl mx-auto text-gray-400 text-lg'>
              Have questions about PropertyManager? Our team is here to help you
              find the right solution for your needs.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8 lg:gap-12'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='md:col-span-2'
            >
              <div className='backdrop-blur-sm rounded-xl bg-gray-800/50 p-8 border border-gray-700'>
                <h3 className='text-xl font-medium mb-6'>Send us a message</h3>

                <form onSubmit={handleSubmit}>
                  <div className='grid md:grid-cols-2 gap-6 mb-6'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium mb-2 text-gray-300'
                      >
                        Your Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400'
                        placeholder='John Doe'
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium mb-2 text-gray-300'
                      >
                        Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400'
                        placeholder='john@example.com'
                        required
                      />
                    </div>
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium mb-2 text-gray-300'
                    >
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400'
                      placeholder='How can we help you?'
                      required
                    />
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='category'
                      className='block text-sm font-medium mb-2 text-gray-300'
                    >
                      Inquiry Category
                    </label>
                    <select
                      id='category'
                      name='category'
                      value={formData.category}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white'
                    >
                      <option value='general'>General Inquiry</option>
                      <option value='sales'>Sales & Pricing</option>
                      <option value='support'>Technical Support</option>
                      <option value='feature'>Feature Request</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium mb-2 text-gray-300'
                    >
                      Your Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400'
                      placeholder='Tell us how we can help you...'
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    className='inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm'
                  >
                    Send Message
                    <Send className='ml-2 h-4 w-4' />
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className='space-y-6'>
                <div className='backdrop-blur-sm rounded-xl bg-gray-800/50 p-6 border border-gray-700'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <div className='w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800/50 flex items-center justify-center'>
                        <Mail className='h-5 w-5 text-blue-400' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-lg font-medium text-white'>
                        Email Us
                      </h4>
                      <p className='text-gray-400 mt-1'>
                        Our team usually responds within 24 hours
                      </p>
                      <a
                        href='mailto:support@propertymanager.com'
                        className='inline-block mt-2 text-blue-400 hover:text-blue-300 transition-colors'
                      >
                        support@propertymanager.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className='backdrop-blur-sm rounded-xl bg-gray-800/50 p-6 border border-gray-700'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <div className='w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800/50 flex items-center justify-center'>
                        <Phone className='h-5 w-5 text-blue-400' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-lg font-medium text-white'>
                        Call Us
                      </h4>
                      <p className='text-gray-400 mt-1'>
                        Mon-Fri from 9am to 6pm (EST)
                      </p>
                      <a
                        href='tel:+1-800-123-4567'
                        className='inline-block mt-2 text-blue-400 hover:text-blue-300 transition-colors'
                      >
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                </div>

                <div className='backdrop-blur-sm rounded-xl bg-gray-800/50 p-6 border border-gray-700'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <div className='w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800/50 flex items-center justify-center'>
                        <MapPin className='h-5 w-5 text-blue-400' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <h4 className='text-lg font-medium text-white'>
                        Visit Us
                      </h4>
                      <p className='text-gray-400 mt-1'>
                        123 Property Lane
                        <br />
                        Suite 400
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mt-16 backdrop-blur-sm rounded-xl bg-indigo-900/20 p-8 border border-indigo-800/30'
          >
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <div className='mb-6 md:mb-0 md:mr-8'>
                <h3 className='text-xl font-medium text-white mb-3'>
                  Need immediate assistance?
                </h3>
                <p className='text-gray-300'>
                  Our live chat support is available during business hours for
                  quick responses to your questions.
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm'
              >
                <MessageSquare className='mr-2 h-5 w-5' />
                Start Live Chat
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
