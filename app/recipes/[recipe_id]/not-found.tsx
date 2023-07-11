import Link from 'next/link';

import { Balancer } from 'react-wrap-balancer';

import { constant } from '~/app/recipes/[recipe_id]/constant';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

export default function Notfound() {
  return (
    <main className="container flex flex-1 items-center py-4">
      <div className="flex w-full flex-col items-center rounded-lg border p-6 text-center">
        <Icons.NotFound size={50} className="mb-2" />

        <h1 className="mb-1 text-xl font-bold">{constant.notFound.title}</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          <Balancer>{constant.notFound.description}</Balancer>
        </p>

        <Button asChild className="w-full gap-2">
          <Link href="/">
            <Icons.Back size={20} /> Back To Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
