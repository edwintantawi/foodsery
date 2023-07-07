import { Brand } from '~/components/brand';
import { SearchBar } from '~/components/search-bar';

export function AppBar() {
  return (
    <nav className="sticky top-0 flex items-center gap-2 border-b p-2 lg:gap-3 lg:p-3">
      <Brand />
      <SearchBar />
    </nav>
  );
}
