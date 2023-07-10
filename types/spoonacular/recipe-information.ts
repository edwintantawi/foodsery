export type RecipeInformation = {
  id: number;
  title: string;
  image?: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: AnalyzedInstruction[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  winePairing: WinePairing;
};

export type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};

export type Step = {
  number: number;
  step: string;
  ingredients: ItemDetail[];
  equipment: ItemDetail[];
  length?: Length;
};

export type ItemDetail = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Length = {
  number: number;
  unit: string;
};

export type ExtendedIngredient = {
  aisle: string | null;
  amount: number;
  consitency: 'SOLID' | 'LIQUID';
  id: number;
  image: string;
  measures: Measures;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  nameClean: string;
  unit: string;
};

export type Measures = {
  metric: Metric;
  us: Metric;
};

export type Metric = {
  amount: number;
  unitLong: string;
  unitShort: string;
};

export type WinePairing = {
  pairedWines: string[];
  pairingText: string;
  productMatches: ProductMatch[];
};

export type ProductMatch = {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
};
