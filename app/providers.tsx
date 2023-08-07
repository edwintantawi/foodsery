'use client';

import * as React from 'react';

import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer';

import { TooltipProvider } from '~/components/ui/tooltip';

interface ProvidersProps {
  children?: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider>
      <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
    </TooltipProvider>
  );
}
