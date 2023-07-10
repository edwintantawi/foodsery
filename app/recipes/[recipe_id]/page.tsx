import * as React from 'react';
import Image from 'next/image';

import { Balancer } from 'react-wrap-balancer';

import { Icons } from '~/components/icons';
import { RecipeSummary } from '~/components/recipe-summary';
import { Section } from '~/components/section';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Separator } from '~/components/ui/separator';
import { spoonacular } from '~/lib/spoonacular';

interface PageProps {
  params: { recipe_id: string };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const recipe = await spoonacular.getRecipeInformationById(
    Number(params.recipe_id)
  );

  return (
    <main className="container flex-1 pt-4">
      <article className="space-y-6">
        <header className="space-y-3">
          <AspectRatio ratio={2 / 1}>
            <Image
              fill
              src={recipe.image ?? '/cover.png'}
              alt={recipe.title}
              className="rounded-lg border object-cover"
            />
          </AspectRatio>
          <h1 className="text-2xl font-bold">
            <Balancer>{recipe.title}</Balancer>
          </h1>
          <Separator className="my-3" />
          <RecipeSummary>{recipe.summary}</RecipeSummary>
        </header>
        <Section
          icon={<Icons.Ingredient />}
          title="Ingredients"
          subtitle="You need the ingredients below to cook it"
        >
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-1">
            {recipe.extendedIngredients.map((ingredient) => {
              const isUnitNotExist = ingredient.unit === '';
              if (isUnitNotExist) {
                ingredient.unit = ingredient.amount > 1 ? 'Items' : 'Item';
              }

              return (
                <li key={ingredient.id}>
                  <article className="grid grid-cols-[80px,1fr] space-x-3 rounded-lg border p-2">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        fill
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                        alt={ingredient.name}
                        className="rounded-lg border object-contain p-2"
                      />
                    </AspectRatio>
                    <header className="flex flex-col justify-center py-2">
                      <h3 className="text-sm font-bold">
                        {ingredient.nameClean}
                      </h3>
                      <p className="text-xs lg:text-sm">
                        {ingredient.originalName}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground lg:text-sm">
                        <em>
                          {ingredient.measures.metric.amount}{' '}
                          {isUnitNotExist
                            ? ingredient.unit
                            : ingredient.measures.metric.unitLong}
                        </em>
                      </p>
                    </header>
                  </article>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section
          icon={<Icons.Instruction />}
          title="Instructions"
          subtitle="Let's follow the instructions for cooking it"
        >
          <div
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            className="text-sm sm:text-base [&>*]:ml-6 [&>*]:list-decimal"
          />
        </Section>
      </article>
    </main>
  );
}
