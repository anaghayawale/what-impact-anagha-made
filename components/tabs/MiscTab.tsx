'use client';

import type { MiscItem } from '@/lib/data';
import { MiscCard } from '@/components/ui/MiscCard';
import { motion } from 'framer-motion';

interface MiscTabProps {
  misc: MiscItem[];
}

export function MiscTab({ misc }: MiscTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {misc.map((item, index) => (
        <motion.div
          key={item.id}
          className="h-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <MiscCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}
