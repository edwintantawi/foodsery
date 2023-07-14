import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  IngredientImageSize,
  RecipeImageSize,
} from '~/types/spoonacular/image';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// sanitizeText
// Removing all html tags from string
export function sanitizeText(text: string) {
  return text.replace(/(<([^>]+)>)/gi, '');
}

// getRecipeImageById
// Returns the url for a recipe image base on the recipe id
export function getRecipeImageById(
  recipeId: number,
  imageSize: RecipeImageSize = '636x393'
) {
  return `https://spoonacular.com/recipeImages/${recipeId}-${imageSize}.jpg`;
}

// getIngredientImageByFileName
// Returns the url for a ingredient image base on the ingredient fileName
// the API will return only the fileName of the image like 'slow-cooker.jpg'
// the fileName can be null, so the 'unknown.png' will be the fallback to get default image
export function getIngredientImageByFileName(
  fileName: string | null,
  imageSize: IngredientImageSize = '100x100'
) {
  return `https://spoonacular.com/cdn/ingredients_${imageSize}/${
    fileName ?? 'unknown.png'
  }`;
}
