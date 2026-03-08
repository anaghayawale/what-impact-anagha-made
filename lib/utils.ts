import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ImpactLevel, SupportingDoc } from '@/lib/data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonth(date: string): string {
  const [year, month] = date.split('-');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

export function computeCertStatus(
  expiresOn: string | null | undefined,
  registered?: boolean,
): 'valid' | 'expiring-soon' | 'expired' | 'no-expiry' | 'exam-registered' {
  if (registered) return 'exam-registered';
  if (!expiresOn) return 'no-expiry';
  const expiry = new Date(`${expiresOn}-01`);
  const now = new Date();
  if (expiry < now) return 'expired';
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  if (expiry <= sixMonthsFromNow) return 'expiring-soon';
  return 'valid';
}

export function getImpactConfig(impact: ImpactLevel): {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  cssVar: string;
} {
  switch (impact) {
    case 'high':
      return {
        label: 'High Impact',
        variant: 'default',
        cssVar: 'var(--chart-1)',
      };
    case 'medium':
      return {
        label: 'Medium Impact',
        variant: 'secondary',
        cssVar: 'var(--chart-4)',
      };
    case 'low':
      return {
        label: 'Low Impact',
        variant: 'outline',
        cssVar: 'var(--muted-foreground)',
      };
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  'Bug Fix': '#e11d48', // Rose
  'User Story': '#2563eb', // Blue
  'Tech Story': '#7c3aed', // Violet
  Tech: '#059669', // Emerald
  Process: '#d97706', // Amber
  'Business Logic': '#0d9488', // Teal
};

const CATEGORY_FALLBACK_COLORS = [
  '#0284c7', // Sky
  '#c026d3', // Fuchsia
  '#65a30d', // Lime
  '#eab308', // Yellow
  '#9333ea', // Purple
];

export function getCategoryColor(category: string): string {
  if (CATEGORY_COLORS[category]) {
    return CATEGORY_COLORS[category];
  }
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CATEGORY_FALLBACK_COLORS.length;
  return CATEGORY_FALLBACK_COLORS[index];
}

export function getDocTypeIcon(type: SupportingDoc['type']): string {
  switch (type) {
    case 'doc':
      return '📄';
    case 'design':
      return '🎨';
    case 'recording':
      return '🎬';
    case 'report':
      return '📊';
    case 'other':
      return '📎';
  }
}
