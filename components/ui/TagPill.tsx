import { cn } from '@/lib/utils';

interface TagPillProps {
  label: string;
  color?: string;
  className?: string;
}

export function TagPill({ label, color, className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors',
        'border-transparent', // Remove default border so custom color applies cleanly
        !color && 'bg-muted text-muted-foreground border-border',
        className,
      )}
      style={
        color
          ? {
              backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
              color: color,
              borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}
