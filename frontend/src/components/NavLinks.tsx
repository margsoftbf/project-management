import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export function NavLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  return [
    ['Features', '/#features'],
    ['Reviews', '/#reviews'],
    ['Pricing', '/#pricing'],
    ['FAQs', '/#faqs'],
  ].map(([label, href], index) => (
    <Link
      key={label}
      href={href}
      className='relative -mx-3 -my-2 rounded-lg px-3 py-2 text-gray-700 text-sm font-medium transition-colors delay-150  hover:delay-0'
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        setHoveredIndex(index);
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null);
        }, 200);
      }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className='absolute inset-0 rounded-lg bg-gray-200'
            layoutId='hoverBackground'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
      <span className='relative z-10'>{label}</span>
    </Link>
  ));
}
