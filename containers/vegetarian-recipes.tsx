import { RecipeCard } from '~/components/recipe-card';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { spoonacular } from '~/lib/spoonacular';
import { getRecipeImageById } from '~/lib/utils';

export async function VegetarianRecipes() {
  const recipes = await spoonacular.getRandomVegetarianRecipes(16);

  return (
    <ScrollArea>
      <ul className="flex gap-1">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              image={getRecipeImageById(recipe.id)}
            />
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
