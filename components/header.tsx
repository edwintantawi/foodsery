import * as React from 'react';

interface HeaderProps {
  title: string;
  subTitle: React.ReactNode;
}

export function Header({ title, subTitle }: HeaderProps) {
  return (
    <header className="my-3 rounded-md border px-4 py-3">
      <h1 className="font-bold">{title}</h1>
      <p className="text-xs text-muted-foreground sm:text-sm">{subTitle}</p>
    </header>
  );
}
