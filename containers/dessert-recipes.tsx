import { RecipeCard } from '~/components/recipe-card';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { spoonacular } from '~/lib/spoonacular';

export async function DessertRecipes() {
  const recipes = await spoonacular.getRandomDessertRecipes(16);

  return (
    <ScrollArea>
      <ul className="flex gap-1">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
            />
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
