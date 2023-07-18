import * as React from 'react';

import { Balancer } from 'react-wrap-balancer';

interface HeaderProps {
  title: string;
  subTitle: React.ReactNode;
}

export function Header({ title, subTitle }: HeaderProps) {
  return (
    <header className="my-4 rounded-md border p-4">
      <h1 className="font-bold">
        <Balancer>{title}</Balancer>
      </h1>
      <p className="text-xs text-muted-foreground">
        <Balancer>{subTitle}</Balancer>
      </p>
    </header>
  );
}
