/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';

import { RecipeDetailPageProps } from '~/app/recipes/[recipe_id]/page';
import { Icons } from '~/components/icons';
import { siteConfig } from '~/configs/site';
import { spoonacular } from '~/lib/spoonacular';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const interBoldFont = fetch(
  new URL('../../../assets/inter-bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function OpengraphImage({
  params,
}: RecipeDetailPageProps) {
  const recipe = await spoonacular.getRecipeInformationById(
    Number(params.recipe_id)
  );

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
        {recipe.image ? (
          <div
            style={{
              display: 'flex',
              position: 'relative',
            }}
          >
            <img
              src={recipe.image}
              alt=""
              width={400}
              height={630}
              style={{
                objectFit: 'cover',
              }}
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
        ) : null}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 60px 60px 20px',
            paddingRight: recipe.image ? '60px' : '120px',
            paddingLeft: recipe.image ? '20px' : '120px',
            justifyContent: 'center',
            width: recipe.image ? '800px' : '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
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
          data: await interBoldFont,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
