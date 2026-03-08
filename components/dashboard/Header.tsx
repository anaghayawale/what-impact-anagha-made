'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

import { Sun, Moon, FileText } from 'lucide-react';
import type { BragData } from '@/lib/data';
import Link from 'next/link';

interface HeaderProps {
  data: Pick<BragData, 'name' | 'role' | 'team' | 'years' | 'profileImage'>;
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export function Header({ data, selectedYear, onYearChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt={data.name}
              className="flex-shrink-0 w-10 h-10 rounded-full object-cover border border-border bg-background"
            />
          ) : (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-base">
              {data.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight text-foreground truncate">
              {data.name}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {data.role}
              {data.team ? ` · ${data.team}` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/report">
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                Generate Promotion Report
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
