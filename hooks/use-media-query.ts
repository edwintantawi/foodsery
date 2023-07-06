'use client';

import React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type Direction = 'up' | 'down';

// breakpoints based on tailwindcss breakpoints
// https://tailwindcss.com/docs/responsive-design
const SizeQueryMapping: Record<Size, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const DirectionQueryMapping: Record<Direction, 'min' | 'max'> = {
  up: 'min',
  down: 'max',
};

export function useMediaQuery(size: Size, direction: Direction) {
  const query = `only screen and (${DirectionQueryMapping[direction]}-width : ${SizeQueryMapping[size]}px)`;

  const subscribe = React.useCallback(
    (callback: EventListener) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);
      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return null;
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
