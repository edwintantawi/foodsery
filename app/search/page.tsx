import * as React from 'react';

interface PageProps {
  searchParams: { q?: string };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <div className="px-4 py-6 text-center">
      <h1>
        <span className="font-bold">Search: </span>
        <span className="text-slate-500">
          {searchParams.q ?? 'nothing there!'}
        </span>
      </h1>
    </div>
  );
}
