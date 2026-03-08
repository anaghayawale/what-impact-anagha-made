'use client';

import type { Certification } from '@/lib/data';
import { CertCard } from '@/components/ui/CertCard';
import { motion } from 'framer-motion';

interface CertificationsTabProps {
  certifications: Certification[];
}

export function CertificationsTab({ certifications }: CertificationsTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {certifications.map((c, index) => (
        <motion.div
          key={c.id}
          className="h-full"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <CertCard cert={c} />
        </motion.div>
      ))}
    </div>
  );
}
