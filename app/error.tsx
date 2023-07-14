'use client';

import { Balancer } from 'react-wrap-balancer';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { getErrorDetail } from '~/lib/exceptions';

interface RootError {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: RootError) {
  const errorDetail = getErrorDetail(error.message);

  return (
    <main className="container flex flex-1 items-center py-4">
      <div className="flex w-full flex-col items-center rounded-lg border p-6 text-center">
        <Icons.ServerError size={50} className="mb-2" />
        <h1 className="mb-1 text-xl font-bold">
          <Balancer>{errorDetail.title}</Balancer>
        </h1>
        <p className="mb-4 text-sm text-muted-foreground">
          <Balancer>{errorDetail.description}</Balancer>
        </p>

        <Button className="w-full gap-2" onClick={reset}>
          <Icons.TryAgain size={20} /> Try Again
        </Button>
      </div>
    </main>
  );
}
