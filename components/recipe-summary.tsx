'use client';

import * as React from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface RecipeSummaryProps {
  children: string;
}

export function RecipeSummary({ children }: RecipeSummaryProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToogleOpen = () => setOpen(!open);

  return (
    <div>
      <div
        className={cn(
          'relative after:absolute after:inset-x-0 after:bottom-0 after:h-20 after:bg-gradient-to-t after:from-background after:to-transparent after:content-[""]',
          {
            'after:content-none': open,
          }
        )}
      >
        <p
          dangerouslySetInnerHTML={{ __html: children }}
          className={cn('text-justify text-sm sm:text-base [&>a]:underline', {
            'line-clamp-5': !open,
          })}
        />
      </div>
      <div
        className={cn('relative z-10 mt-0 text-center', {
          'mt-3': open,
        })}
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-2"
          onClick={handleToogleOpen}
        >
          <Icons.BookOpen size={20} />
          {open ? 'Read less' : 'Read more'}
        </Button>
      </div>
    </div>
  );
}
