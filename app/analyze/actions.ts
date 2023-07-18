'use server';

import { spoonacular } from '~/lib/spoonacular';

export async function analyzeFoodImageAction(formData: FormData) {
  const file = formData.get('file') as File | null;
  if (file === null) {
    return { error: 'No image found', payload: null };
  }

  const result = await spoonacular.AnalyzeFoodImageByFile(file as File);
  return { error: null, payload: result };
}
