'use client';

import { useEffect, useRef, useState } from 'react';
import type { Skill } from '@/lib/data';

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {skill.name}
        </span>
        <span className="text-sm font-mono text-muted-foreground">
          {skill.level}/5
        </span>
      </div>
      <div className="flex gap-1">
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="#a100ff" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = filled && star <= Math.floor(skill.level);
          const isHalf =
            filled &&
            !isFull &&
            star === Math.ceil(skill.level) &&
            skill.level % 1 !== 0;

          let fillValue = 'none';
          if (isFull) fillValue = 'currentColor';
          if (isHalf) fillValue = 'url(#half-star)';

          return (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={fillValue}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-colors duration-700 ${
                isFull || isHalf ? 'text-[#a100ff]' : 'text-muted-foreground/20'
              }`}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </div>
    </div>
  );
}
