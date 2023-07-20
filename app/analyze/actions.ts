'use server';

import { spoonacular } from '~/lib/spoonacular';

export async function analyzeFoodImageAction(formData: FormData) {
  const file = formData.get('file');
  if (file === null) {
    throw new Error('File not found');
  }

  return spoonacular.AnalyzeFoodImageByFile(file as File);
}
