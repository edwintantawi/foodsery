import { ImageResponse } from 'next/server';

import { Icons } from '~/components/icons';

export const runtime = 'edge';

export const alt = 'Foodsery';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icons.Brand size={280} />
      </div>
    ),
    { ...size }
  );
}
