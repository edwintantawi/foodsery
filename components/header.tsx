import * as React from 'react';

import { Balancer } from 'react-wrap-balancer';

interface HeaderProps {
  title: string;
  subTitle: React.ReactNode;
}

export function Header({ title, subTitle }: HeaderProps) {
  return (
    <header className="my-3 rounded-md border px-4 py-3">
      <h1 className="font-bold">
        <Balancer>{title}</Balancer>
      </h1>
      <p className="text-sm text-muted-foreground">
        <Balancer>{subTitle}</Balancer>
      </p>
    </header>
  );
}
