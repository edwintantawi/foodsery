'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useMediaQuery } from '~/hooks/use-media-query';
import { cn } from '~/lib/utils';

const searchPlaceholder = {
  mobile: 'Search recipes',
  desktop:
    'Explore a collection of over 5,000 diverse recipes waiting to be discovered',
};

export function SearchBar() {
  const router = useRouter();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState('');
  const isSmUp = useMediaQuery('sm', 'up');

  const isEmptyQuery = query === '';

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (inputRef.current === null) return;

      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current.focus();
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        inputRef.current.blur();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChangeQuery = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleClearSearch = () => setQuery('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) return;

    inputRef.current?.blur();
    router.push(`/search?q=${query}`);
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <Icons.Search
          size={20}
          className="absolute bottom-1/2 left-3 translate-y-1/2 text-slate-400"
        />
        <Input
          ref={inputRef}
          className={cn('truncate px-11', {
            'pr-14': isEmptyQuery,
          })}
          placeholder={
            isSmUp ? searchPlaceholder.desktop : searchPlaceholder.mobile
          }
          value={query}
          onChange={handleChangeQuery}
        />

        {isEmptyQuery ? (
          <kbd className="pointer-events-none absolute bottom-1/2 right-2 flex h-7 translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium">
            <span className="text-xs">⌘</span>K
          </kbd>
        ) : (
          <Button
            type="reset"
            variant="secondary"
            className="absolute bottom-1/2 right-1.5 h-7 w-7 translate-y-1/2 border p-1"
            onClick={handleClearSearch}
          >
            <Icons.Cancel size={16} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}
