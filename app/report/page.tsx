import { fetchData } from '@/lib/fetchData';
import { formatMonth } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrintButton } from '@/components/ui/PrintButton';
import { FadeIn } from '@/components/ui/FadeIn';

export const metadata = {
  title: 'Impact Report',
  description: 'Comprehensive timeline of achievements and impact.',
};

export default async function ReportPage() {
  const data = await fetchData();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background print:bg-white p-4 sm:p-8">
        {/* Navigation / Actions Bar (Hidden on print) */}
        <div className="max-w-4xl mx-auto flex items-center justify-between mb-8 no-print">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </Button>
          <PrintButton />
        </div>

        {/* Report Document */}
        <FadeIn className="max-w-4xl mx-auto bg-card print:bg-transparent print:shadow-none shadow-sm border border-border print:border-none rounded-xl p-8 sm:p-12">
          {/* Header */}
          <header className="border-b border-border pb-8 mb-8 text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground print:text-black">
              {data.name}
            </h1>
            <p className="text-xl text-muted-foreground print:text-gray-700">
              {data.role} {data.team && `· ${data.team}`}
            </p>
            <p className="text-sm font-mono text-muted-foreground print:text-gray-500 mt-2">
              Evaluation Period: {data.period}
            </p>
          </header>

          {/* Metrics Summary */}
          <section className="mb-12 page-break-inside-avoid">
            <h2 className="text-2xl font-bold mb-6 text-foreground print:text-black border-b border-border pb-2">
              Impact at a Glance
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-mono font-bold text-foreground print:text-black">
                  {data.metrics.numberOfRelease}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  No. of Releases
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-mono font-bold text-foreground print:text-black">
                  {data.certifications.length}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  Certifications
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-mono font-bold text-foreground print:text-black">
                  {data.skills.reduce((acc, skill) => acc + skill.level, 0)}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  Total Skill Stars
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-mono font-bold text-foreground print:text-black">
                  {data.achievements.filter((a) => a.impact === 'high').length}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  High Impact Wins
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-mono font-bold text-foreground print:text-black">
                  {data.testimonials.length}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  Peer Shoutouts
                </p>
              </div>
            </div>
          </section>

          {/* Key Achievements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground print:text-black border-b border-border pb-2">
              Key Achievements
            </h2>
            <div className="space-y-8">
              {data.achievements.map((achievement) => (
                <div key={achievement.id} className="page-break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground print:text-black">
                      {achievement.title}
                    </h3>
                    {achievement.date && (
                      <span className="text-sm font-mono text-muted-foreground shrink-0 mt-1 sm:mt-0">
                        {formatMonth(achievement.date)}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary print:border print:border-gray-300 print:text-black">
                      {achievement.category}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground print:border print:border-gray-300 print:text-black">
                      {achievement.impact.toUpperCase()} IMPACT
                    </span>
                  </div>

                  <p className="text-foreground print:text-gray-800 mb-4 whitespace-pre-wrap">
                    {achievement.description}
                  </p>

                  {/* Highlight Metric */}
                  {achievement.metric && (
                    <div className="bg-muted/30 print:bg-gray-50 border-l-2 border-primary/40 px-3 py-2 text-sm text-foreground print:text-black mt-2 mb-4 font-medium">
                      🎯 Key Metric: {achievement.metric}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Badges */}
          {data.badges.length > 0 && (
            <section className="mb-12 page-break-inside-avoid">
              <h2 className="text-2xl font-bold mb-6 text-foreground print:text-black border-b border-border pb-2">
                Badges
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {data.badges.map((b) => (
                  <div
                    key={b.id}
                    className="text-center flex flex-col items-center"
                  >
                    {b.imageUrl ? (
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="mb-3 object-contain"
                        style={{
                          width: b.imageWidth || 100,
                          height: b.imageHeight || 100,
                        }}
                      />
                    ) : (
                      <div
                        className="w-[100px] h-[100px] flex items-center justify-center rounded-lg text-4xl mb-3"
                        style={{ backgroundColor: b.color + '20' }}
                      >
                        {b.icon}
                      </div>
                    )}
                    <h3 className="text-sm font-semibold text-foreground print:text-black">
                      {b.title}
                    </h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section className="mb-12 page-break-inside-avoid">
              <h2 className="text-2xl font-bold mb-6 text-foreground print:text-black border-b border-border pb-2">
                Certifications
              </h2>
              <div className="space-y-4">
                {data.certifications.map((c) => (
                  <div key={c.id} className="flex gap-4 items-center">
                    <span className="text-2xl">{c.icon || '🏅'}</span>
                    <div>
                      <h3 className="font-semibold text-foreground print:text-black leading-tight">
                        {c.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {c.issuer} {c.issuedOn ? `· Issued ${c.issuedOn}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Endorsements / Testimonials */}
          {data.testimonials.length > 0 && (
            <section className="page-break-inside-avoid">
              <h2 className="text-2xl font-bold mb-6 text-foreground print:text-black border-b border-border pb-2">
                Peer Feedback & Endorsements
              </h2>
              <div className="space-y-6">
                {data.testimonials.map((t) => (
                  <blockquote
                    key={t.id}
                    className="border-l-4 border-primary/50 pl-4 py-2"
                  >
                    <p className="italic text-foreground print:text-gray-800 mb-2">
                      "{t.comment}"
                    </p>
                    <footer className="text-sm font-medium text-muted-foreground print:text-gray-600">
                      — {t.name}, {t.designation}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}
        </FadeIn>
      </div>
    </ThemeProvider>
  );
}
