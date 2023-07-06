import * as React from 'react';
import NextLink from 'next/link';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface BrandProps {
  className?: string;
}

export const Brand = React.forwardRef<HTMLAnchorElement, BrandProps>(
  function Brand({ className }, ref) {
    return (
      <div className="flex w-fit items-center gap-1.5 text-primary">
        <Button asChild size="icon">
          <NextLink ref={ref} href="/" className={cn(className)}>
            <Icons.Brand />
            <span className="sr-only">Foodsery</span>
          </NextLink>
        </Button>
      </div>
    );
  }
);
