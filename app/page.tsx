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
    </main>
  );
}
