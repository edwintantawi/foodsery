import Link from 'next/link';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

export function Brand() {
  return (
    <div className="flex w-fit items-center gap-1.5 text-primary">
      <Button asChild size="icon">
        <Link href="/">
          <Icons.Brand />
          <span className="sr-only">Foodsery</span>
        </Link>
      </Button>
    </div>
  );
}
