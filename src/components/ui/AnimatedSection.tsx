'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps extends Omit<MotionProps, 'children'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 18 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  ...rest
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      variants={variants[direction]}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
