import { Icons } from '~/components/icons';
import { DailyRecipes } from '~/containers/daily-recipes';

export default function Page() {
  return (
    <main className="container flex-1 space-y-4 pt-1">
      <section>
        <header className="sticky top-[65px] z-40 mb-1 flex items-start gap-2 bg-background py-2">
          <div className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg border bg-slate-100 text-primary">
            <Icons.Calendar className="aspect-square w-5" />
          </div>
          <div>
            <h2 className="font-bold">Daily Recipes</h2>
            <p className="text-xs text-muted-foreground">
              Let&lsquo;s try a new interesting recipe today
            </p>
          </div>
        </header>
        <DailyRecipes />
      </section>

      <section>
        <header className="sticky top-[65px] z-40 mb-1 flex items-start gap-2 bg-background py-2">
          <div className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg border bg-slate-100 text-primary">
            <Icons.Leaf className="aspect-square w-5" />
          </div>
          <div>
            <h2 className="font-bold">The Vegetarian Ways</h2>
            <p className="text-xs text-muted-foreground">
              Vegetarians need not worry, this is for you!
            </p>
          </div>
        </header>
        <DailyRecipes />
      </section>

      <section>
        <header className="sticky top-[65px] z-40 mb-1 flex items-start gap-2 bg-background py-2">
          <div className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg border bg-slate-100 text-primary">
            <Icons.Dessert className="aspect-square w-5" />
          </div>
          <div>
            <h2 className="font-bold">The Dessert Land</h2>
            <p className="text-xs text-muted-foreground">
              Delicious recipe perfect for dessert
            </p>
          </div>
        </header>
        <DailyRecipes />
      </section>

      <section className="flex items-center gap-5 rounded-lg border px-5 py-4">
        <Icons.LightBulb className="shrink-0" />
        <div>
          <h2 className="mb-0.5 text-base font-bold">Food Trivia</h2>
          <p className="text-xs text-slate-500">
            The red food-coloring carmine used in Skittles and other candies is
            made from boiled cochineal bugs, a type of beetle.
          </p>
        </div>
      </section>
    </main>
  );
}
