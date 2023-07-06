import { Brand } from '~/components/brand';

export function AppBar() {
  return (
    <nav className="sticky top-0 flex items-center gap-2 border-b p-3 lg:gap-4">
      <Brand />
    </nav>
  );
}
