import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '~/components/ui/aspect-ratio';

interface RecipeCardProps {
  id: number;
  title: string;
  image?: string;
}

export function RecipeCard({ id, title, image }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${id}`}
      className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="sr-only">{title}</span>
      <article className="group relative w-36 space-y-2 overflow-hidden rounded-lg border after:absolute after:inset-0 after:bg-gradient-to-t after:from-slate-900 after:to-transparent after:content-[''] hover:after:to-50% lg:w-48">
        <AspectRatio ratio={8 / 12}>
          <Image
            fill
            src={image ?? '/cover.png'}
            alt={title}
            placeholder="blur"
            blurDataURL="/cover.png"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </AspectRatio>
        <header className="absolute bottom-0 z-10 p-3 lg:p-4">
          <h2
            title={title}
            className="line-clamp-2 text-xs text-white lg:text-sm"
          >
            {title}
          </h2>
        </header>
      </article>
    </Link>
  );
}
