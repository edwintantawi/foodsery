import * as React from 'react';

import { Brand } from '~/components/brand';
import { SearchBar } from '~/components/search-bar';

export function AppBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center gap-2 border-b bg-background p-2 lg:gap-3 lg:p-3">
      <Brand />
      <React.Suspense fallback={<div className="h-10 w-full" />}>
        <SearchBar />
      </React.Suspense>
    </nav>
  );
}
