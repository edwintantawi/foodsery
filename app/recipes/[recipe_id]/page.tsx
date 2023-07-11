import * as React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Balancer } from 'react-wrap-balancer';

import { constant } from '~/app/recipes/[recipe_id]/constant';
import { Icons } from '~/components/icons';
import { IngredientCard } from '~/components/ingredient-card';
import { RecipeSummary } from '~/components/recipe-summary';
import { Section } from '~/components/section';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Separator } from '~/components/ui/separator';
import { spoonacular } from '~/lib/spoonacular';
import { sanitizeText } from '~/lib/utils';

export interface RecipeDetailPageProps {
  params: { recipe_id: string };
}

export async function generateMetadata({
  params,
}: RecipeDetailPageProps): Promise<Metadata> {
  try {
    const recipe = await spoonacular.getRecipeInformationById(
      Number(params.recipe_id)
    );

    if (recipe === null) {
      return {
        title: constant.notFound.title,
        description: constant.notFound.description,
      };
    }

    return {
      title: recipe.title,
      description: sanitizeText(recipe.summary),
      openGraph: {
        title: recipe.title,
        description: sanitizeText(recipe.summary),
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const recipe = await spoonacular.getRecipeInformationById(
    Number(params.recipe_id)
  );

  if (recipe === null) return notFound();

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
              return (
                <li key={ingredient.id}>
                  <IngredientCard ingredient={ingredient} />
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
            className="text-sm sm:text-base [&>*]:ml-6 [&>*]:list-decimal [&_li]:mb-3"
          />
        </Section>
      </article>
    </main>
  );
}
