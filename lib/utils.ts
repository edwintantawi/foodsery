import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { RecipeImageSize } from '~/types/spoonacular/image';

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
