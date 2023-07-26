import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Balancer } from 'react-wrap-balancer';

import { constant } from '~/app/search/constant';
import { Icons } from '~/components/icons';
import { RecipeCard } from '~/components/recipe-card';
import { Button } from '~/components/ui/button';
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
        openGraph: {
          title: constant.notFound.title,
          description: constant.notFound.description,
        },
      };
    }

    return {
      title: `Search results for ${searchParams.q}`,
      openGraph: {
        title: `Search results for ${searchParams.q}`,
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.q) return redirect('/');

  const recipes = await spoonacular.searchRecipesByQuery(searchParams.q);

  // related to this issue https://github.com/edwintantawi/foodsery/issues/5
  // if the search result is empty, we will show a not found page here
  // instead of using not-found.tsx page
  if (recipes.length === 0) {
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

  return (
    <main className="container flex-1">
      <header className="my-4 rounded-md border bg-background px-3 py-2">
        <h1 className="text-muted-foreground">
          Search results for{' '}
          <span className="font-bold text-foreground">
            {searchParams.q ?? 'nothing there!'}
          </span>
        </h1>
      </header>

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
