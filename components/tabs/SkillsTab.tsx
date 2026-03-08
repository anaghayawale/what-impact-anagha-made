'use client';

import type { Skill } from '@/lib/data';
import { SkillBar } from '@/components/ui/SkillBar';
import { motion } from 'framer-motion';

interface SkillsTabProps {
  skills: Skill[];
}

export function SkillsTab({ skills }: SkillsTabProps) {
  const improved = skills.filter(
    (s) => !s.category || s.category === 'improved',
  );
  const newSkills = skills.filter((s) => s.category === 'new');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x divide-border">
      {newSkills.length > 0 && (
        <section className="space-y-4 md:pr-8">
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <h3 className="text-sm font-semibold text-foreground">
              New Skills
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({newSkills.length})
            </span>
          </div>
          <div className="space-y-5">
            {newSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SkillBar skill={skill} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {improved.length > 0 && (
        <section className="space-y-4 md:pl-8">
          <div className="flex items-center gap-2">
            <span className="text-base">📈</span>
            <h3 className="text-sm font-semibold text-foreground">
              Improved Skills
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({improved.length})
            </span>
          </div>
          <div className="space-y-5">
            {improved.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SkillBar skill={skill} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {improved.length === 0 && newSkills.length === 0 && (
        <p className="text-sm text-muted-foreground">No skills added yet.</p>
      )}
    </div>
  );
}
