import { RecipeCard } from '~/components/recipe-card';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { spoonacular } from '~/lib/spoonacular';

export async function DailyRecipes() {
  const recipes = await spoonacular.getRandomRecipes(16);

  return (
    <ScrollArea>
      <ul className="flex gap-1 p-1 lg:gap-2">
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
