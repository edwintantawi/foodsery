/* eslint-disable @next/next/no-img-element */
import { ImageResponse, NextResponse } from 'next/server';

import { RecipeDetailPageProps } from '~/app/recipes/[recipe_id]/page';
import { Icons } from '~/components/icons';
import { siteConfig } from '~/configs/site';
import { spoonacular } from '~/lib/spoonacular';
import { getRecipeImageById } from '~/lib/utils';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

async function getInterBoldFont() {
  const response = await fetch(
    new URL('../../../assets/inter-bold.ttf', import.meta.url)
  );
  return response.arrayBuffer();
}

export default async function OpengraphImage({
  params,
}: RecipeDetailPageProps) {
  try {
    const interBoldFont = await getInterBoldFont();

    const recipe = await spoonacular.getRecipeInformationById(
      Number(params.recipe_id)
    );

    if (recipe === null) {
      return NextResponse.json(null, { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            background: 'white',
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', position: 'relative' }}>
            <img
              src={getRecipeImageById(recipe.id)}
              alt=""
              width={400}
              height={630}
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(to left, #ffffff, #ffffff00)',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px 60px 60px 20px',
              paddingRight: '60px',
              paddingLeft: '20px',
              width: '800px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons.Brand size={48} />
              <h2 style={{ fontSize: '30px' }}>{siteConfig.name}</h2>
            </div>
            <h1
              style={{
                fontSize: '60px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {recipe.title}
            </h1>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Inter',
            data: interBoldFont,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
