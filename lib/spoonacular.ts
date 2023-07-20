import { RecipeInformation } from '~/types/spoonacular/recipe-information';
import { RecipeSearchResult } from '~/types/spoonacular/recipe-search';

class SpoonacularAPI {
  private baseURL = 'https://api.spoonacular.com';

  constructor(private apiKey: string) {}

  private buildEndpoint(
    endpoint: string,
    searchParams?: Record<string, string>
  ) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.searchParams.append('apiKey', this.apiKey);
    Object.entries(searchParams ?? {}).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    return url;
  }

  // Get n random daily recipes
  // https://spoonacular.com/food-api/docs#Get-Random-Recipes
  async getRandomDailyRecipes(number: number): Promise<RecipeInformation[]> {
    const endpoint = this.buildEndpoint('/recipes/random', {
      number: number.toString(),
    });
    const response = await fetch(endpoint, {
      // Revalidate every 24 hours
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch random daily recipes');
    }

    const data = await response.json();
    return data.recipes;
  }

  // Get n random vegetarian recipes
  // https://spoonacular.com/food-api/docs#Get-Random-Recipes
  async getRandomVegetarianRecipes(
    number: number
  ): Promise<RecipeInformation[]> {
    const endpoint = this.buildEndpoint('/recipes/random', {
      number: number.toString(),
      tags: 'vegetarian',
    });
    const response = await fetch(endpoint, {
      // Revalidate every 1 week
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch random vegetarian recipes');
    }

    const data = await response.json();
    return data.recipes;
  }

  // Get n random dessert recipes
  // https://spoonacular.com/food-api/docs#Get-Random-Recipes
  async getRandomDessertRecipes(number: number): Promise<RecipeInformation[]> {
    const endpoint = this.buildEndpoint('/recipes/random', {
      number: number.toString(),
      tags: 'dessert',
    });
    const response = await fetch(endpoint, {
      // Revalidate every 1 week
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch random dessert recipes');
    }

    const data = await response.json();
    return data.recipes;
  }

  // Get random food trivia
  // https://spoonacular.com/food-api/docs#Random-Food-Trivia
  async getRandomFoodTrivia(): Promise<string> {
    const endpoint = this.buildEndpoint('/food/trivia/random');
    const response = await fetch(endpoint, {
      // Revalidate every 24 hours
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch random food trivia');
    }

    const data = await response.json();
    return data.text;
  }

  // Get recipes information by id
  // https://spoonacular.com/food-api/docs#Get-Recipe-Information
  async getRecipeInformationById(
    id: number
  ): Promise<RecipeInformation | null> {
    const endpoint = this.buildEndpoint(`/recipes/${id}/information`);

    const response = await fetch(endpoint, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch recipe information with id "${id}"`);
    }

    const data = await response.json();
    return data;
  }

  // Get recipes by search query
  // https://spoonacular.com/food-api/docs#Search-Recipes-Complex
  async searchRecipesByQuery(query: string): Promise<RecipeSearchResult[]> {
    const endpoint = this.buildEndpoint('/recipes/complexSearch', {
      query,
    });

    const response = await fetch(endpoint, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipes by query');
    }

    const data = await response.json();
    return data.results;
  }
}

export const spoonacular = new SpoonacularAPI(
  process.env.SPOONACULAR_API_KEY ?? ''
);
