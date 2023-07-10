import { RecipeInformation } from '~/types/spoonacular/recipe-information';

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
      limitLicense: 'true',
    });
    const response = await fetch(endpoint, {
      // Revalidate every 24 hours
      next: { revalidate: 60 * 60 * 24 },
    });
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
      limitLicense: 'true',
      tags: 'vegetarian',
    });
    const response = await fetch(endpoint, {
      // Revalidate every 1 week
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    const data = await response.json();
    return data.recipes;
  }

  // Get n random dessert recipes
  // https://spoonacular.com/food-api/docs#Get-Random-Recipes
  async getRandomDessertRecipes(number: number): Promise<RecipeInformation[]> {
    const endpoint = this.buildEndpoint('/recipes/random', {
      number: number.toString(),
      limitLicense: 'true',
      tags: 'dessert',
    });
    const response = await fetch(endpoint, {
      // Revalidate every 1 week
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    const data = await response.json();
    return data.recipes;
  }
}

export const spoonacular = new SpoonacularAPI(
  process.env.SPOONACULAR_API_KEY ?? ''
);
