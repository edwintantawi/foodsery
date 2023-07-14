import * as React from 'react';
import Image from 'next/image';

import { Balancer } from 'react-wrap-balancer';

import { AspectRatio } from '~/components/ui/aspect-ratio';

interface IngredientCardProps {
  image: string;
  title: string;
  subTitle: string;
  measurement: string;
}

export function IngredientCard({
  title,
  subTitle,
  image,
  measurement,
}: IngredientCardProps) {
  return (
    <article className="grid grid-cols-[80px,1fr] space-x-3 rounded-lg border p-2">
      <AspectRatio ratio={1 / 1}>
        <Image
          fill
          src={image}
          alt={title}
          className="rounded-lg border object-contain p-2"
        />
      </AspectRatio>
      <header className="flex flex-col justify-center py-2">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-xs lg:text-sm">
          <Balancer>{subTitle}</Balancer>
        </p>
        <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
          <em>{measurement}</em>
        </p>
      </header>
    </article>
  );
}
