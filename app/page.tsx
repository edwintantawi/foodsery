import { Icons } from '~/components/icons';
import { Section } from '~/components/section';
import { DailyRecipes } from '~/containers/daily-recipes';
import { DessertRecipes } from '~/containers/dessert-recipes';
import { FoodTrivia } from '~/containers/food-trivia';
import { VegetarianRecipes } from '~/containers/vegetarian-recipes';

export default function Page() {
  return (
    <main className="container flex-1 space-y-4 pt-1">
      <Section
        icon={<Icons.Calendar className="aspect-square w-5" />}
        title="Daily Recipes"
        subtitle="Let&lsquo;s try a new interesting recipe today"
      >
        <DailyRecipes />
      </Section>

      <Section
        icon={<Icons.Leaf className="aspect-square w-5" />}
        title="The Vegetarian Ways"
        subtitle="Vegetarians need not worry, this is for you!"
      >
        <VegetarianRecipes />
      </Section>

      <Section
        icon={<Icons.Dessert className="aspect-square w-5" />}
        title="The Dessert Land"
        subtitle="Delicious recipe perfect for dessert"
      >
        <DessertRecipes />
      </Section>

      <FoodTrivia />
    </main>
  );
}
