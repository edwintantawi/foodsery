import * as React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { constant } from '~/app/search/constant';
import { Header } from '~/components/header';
import { RecipeCard } from '~/components/recipe-card';
import { spoonacular } from '~/lib/spoonacular';
import { getRecipeImageById } from '~/lib/utils';

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  try {
    if (!searchParams.q) return {};

    const recipes = await spoonacular.searchRecipesByQuery(searchParams.q);

    if (recipes.length === 0) {
      return {
        title: constant.notFound.title,
        description: constant.notFound.description,
      };
    }

    return {
      title: `Search results for ${searchParams.q}`,
    };
  } catch (error) {
    return {};
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.q) return redirect('/');

  const recipes = await spoonacular.searchRecipesByQuery(searchParams.q);

  if (recipes.length === 0) return notFound();

  return (
    <main className="container flex-1">
      <Header
        title="Your Search Result"
        subTitle={
          <React.Fragment>
            For keyword:{' '}
            <span className="font-bold text-foreground">
              {searchParams.q ?? 'nothing there!'}
            </span>
          </React.Fragment>
        }
      />

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={getRecipeImageById(recipe.id)}
              className="w-full"
            />
          );
        })}
      </section>
    </main>
  );
}
