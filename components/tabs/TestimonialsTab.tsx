'use client';

import type { Testimonial } from '@/lib/data';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { motion } from 'framer-motion';

interface TestimonialsTabProps {
  testimonials: Testimonial[];
}

export function TestimonialsTab({ testimonials }: TestimonialsTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {testimonials.map((t, index) => (
        <motion.div
          key={t.id}
          className="h-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <TestimonialCard testimonial={t} />
        </motion.div>
      ))}
    </div>
  );
}
