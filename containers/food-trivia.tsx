import { Icons } from '~/components/icons';
import { spoonacular } from '~/lib/spoonacular';

export async function FoodTrivia() {
  const foodTrivia = await spoonacular.getRandomFoodTrivia();

  return (
    <section className="flex items-center gap-5 rounded-lg border px-5 py-4">
      <Icons.LightBulb className="shrink-0" />
      <div>
        <h2 className="mb-0.5 text-base font-bold">Food Trivia</h2>
        <p className="text-xs text-slate-500">{foodTrivia}</p>
      </div>
    </section>
  );
}
