import { DailyRecipes } from '~/containers/daily-recipes';

export default async function Page() {
  return (
    <main className="container py-2 lg:py-4">
      <section>
        <h2 className="sr-only">Daily Recipes</h2>
        <DailyRecipes />
      </section>
    </main>
  );
}
