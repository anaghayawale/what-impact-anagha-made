'use client';

import type { Badge } from '@/lib/data';
import { BadgeCard } from '@/components/ui/BadgeCard';
import { motion } from 'framer-motion';

interface BadgesTabProps {
  badges: Badge[];
}

export function BadgesTab({ badges }: BadgesTabProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((b, index) => (
        <motion.div
          key={b.id}
          className="h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <BadgeCard badge={b} />
        </motion.div>
      ))}
    </div>
  );
}
