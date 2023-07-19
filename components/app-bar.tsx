import * as React from 'react';
import Link from 'next/link';

import { Brand } from '~/components/brand';
import { Icons } from '~/components/icons';
import { SearchBar } from '~/components/search-bar';
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';

export function AppBar() {
  return (
    <nav className="container sticky top-0 z-50 flex items-center gap-2 border-b bg-background py-3">
      <Brand />
      <React.Suspense fallback={<div className="h-10 w-full" />}>
        <SearchBar />
      </React.Suspense>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon" variant="outline">
              <Link href="/analyze">
                <Icons.Camera />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Food Image Analysis</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}
