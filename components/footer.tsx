import Link from 'next/link';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { siteConfig } from '~/configs/site';

export function Footer() {
  return (
    <footer className="container mt-4 flex items-center justify-between gap-2 border-t border-border py-4">
      <p className="text-center text-xs text-muted-foreground">
        Copyright &copy; 2023 {siteConfig.name}
      </p>
      <section className="space-x-1">
        <Button asChild size="icon" className="h-8 w-8 p-0">
          <Link href={siteConfig.githubUrl} target="_blank">
            <Icons.Github size={16} />
            <span className="sr-only">Github</span>
          </Link>
        </Button>
      </section>
    </footer>
  );
}
