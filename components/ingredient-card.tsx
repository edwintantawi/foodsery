import * as React from 'react';
import Image from 'next/image';

import { Balancer } from 'react-wrap-balancer';

import { AspectRatio } from '~/components/ui/aspect-ratio';
import {
  getIngredientImageByFileName,
  getIngredientMeasurement,
} from '~/lib/utils';
import { ExtendedIngredient } from '~/types/spoonacular/recipe-information';

interface IngredientCardProps {
  ingredient: ExtendedIngredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const image = getIngredientImageByFileName(ingredient.image);

  return (
    <article className="grid grid-cols-[80px,1fr] space-x-3 rounded-lg border p-2">
      <AspectRatio ratio={1 / 1}>
        <Image
          fill
          src={image}
          alt={ingredient.name}
          className="rounded-lg border object-contain p-2"
        />
      </AspectRatio>
      <header className="flex flex-col justify-center py-2">
        <h3 className="text-sm font-bold">{ingredient.nameClean}</h3>
        <p className="text-xs lg:text-sm">
          <Balancer>{ingredient.originalName}</Balancer>
        </p>
        <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
          <em>{getIngredientMeasurement(ingredient.measures.metric)}</em>
        </p>
      </header>
    </article>
  );
}
