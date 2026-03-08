'use client';

import {
  Lightbulb,
  CheckCircle2,
  Calendar,
  Target,
  Clock,
  ArrowRight,
} from 'lucide-react';
import type {
  InnovationIdea,
  InnovationStatus,
  InnovationCategory,
} from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';

interface InnovationFocusTabProps {
  ideas: InnovationIdea[];
}

export function InnovationFocusTab({ ideas }: InnovationFocusTabProps) {
  const [selectedIdea, setSelectedIdea] = useState<InnovationIdea | null>(null);

  if (ideas.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
        <Lightbulb className="w-12 h-12 mb-4 opacity-50" />
        <p>No innovation focuses found for the selected period.</p>
      </Card>
    );
  }

  const getStatusIcon = (status: InnovationStatus) => {
    switch (status) {
      case 'Implemented':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Planned':
        return <Target className="w-4 h-4 text-blue-500" />;
      case 'Proposed':
        return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  const getCategoryColor = (category: InnovationCategory) => {
    switch (category) {
      case 'Tech':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20';
      case 'Business Logic':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20';
      case 'Process':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat chips */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatChip label="Total Ideas" value={ideas.length} />
        <StatChip
          label="Tech Focus"
          value={ideas.filter((i) => i.category === 'Tech').length}
        />
        <StatChip
          label="Process Focus"
          value={ideas.filter((i) => i.category === 'Process').length}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => {
          return (
            <Card
              key={idea.id}
              onClick={() => setSelectedIdea(idea)}
              className="group overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-primary/50 cursor-pointer bg-gradient-to-br from-card to-muted/20"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <Badge
                    variant="secondary"
                    className={`font-medium ${getCategoryColor(idea.category)} border-0 rounded-md`}
                  >
                    {idea.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-background rounded-full px-2.5 py-1 border border-border shadow-sm">
                    {getStatusIcon(idea.status)}
                    {idea.status}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {idea.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col gap-4">
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {idea.description}
                </CardDescription>

                <div className="mt-auto pt-4 flex flex-col gap-3">
                  {idea.impact && (
                    <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm border border-emerald-500/20">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5 text-xs uppercase tracking-wider">
                        Business Impact
                      </span>
                      <span className="text-foreground/90 leading-snug">
                        {idea.impact}
                      </span>
                    </div>
                  )}

                  {idea.date && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{idea.date}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog
        open={!!selectedIdea}
        onOpenChange={(open) => !open && setSelectedIdea(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          {selectedIdea && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start mb-2 gap-4 mr-6">
                  <Badge
                    variant="secondary"
                    className={`font-medium ${getCategoryColor(selectedIdea.category)} border-0 rounded-md`}
                  >
                    {selectedIdea.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-background rounded-full px-2.5 py-1 border border-border shadow-sm">
                    {getStatusIcon(selectedIdea.status)}
                    {selectedIdea.status}
                  </div>
                </div>
                <DialogTitle className="text-xl">
                  {selectedIdea.title}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground mt-4 leading-relaxed whitespace-pre-wrap">
                  {selectedIdea.description}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 mt-4">
                {selectedIdea.impact && (
                  <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm border border-emerald-500/20">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5 text-xs uppercase tracking-wider">
                      Business Impact
                    </span>
                    <span className="text-foreground/90 leading-snug">
                      {selectedIdea.impact}
                    </span>
                  </div>
                )}

                {selectedIdea.date && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedIdea.date}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatChip({
  label,
  value,
  trend,
}: {
  label: string;
  value: number | string;
  trend?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 relative overflow-hidden group hover:border-primary/30 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <p className="text-2xl font-bold font-sans tracking-tight text-foreground relative z-10 flex items-center gap-2">
        {value}
        {trend && (
          <span className="text-xs font-normal text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </p>
      <p className="text-xs font-medium text-muted-foreground mt-1 relative z-10 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
