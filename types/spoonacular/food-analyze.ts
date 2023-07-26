export type FoodAnalyzeResult = {
  nutrition: FoodAnalyzeNutrition;
  category: FoodAnalyzeCategory;
  recipes: FoodAnalyzeRecipe[];
};

export type FoodAnalyzeCategory = {
  name: string;
  probability: number;
};

export type FoodAnalyzeNutrition = {
  recipesUsed: number;
  calories: FoodAnalyzeNutritionMeasurement;
  fat: FoodAnalyzeNutritionMeasurement;
  protein: FoodAnalyzeNutritionMeasurement;
  carbs: FoodAnalyzeNutritionMeasurement;
};

export type FoodAnalyzeNutritionMeasurement = {
  value: number;
  unit: string;
  confidenceRange95Percent: FoodAnalyzeConfidenceRange95Percent;
  standardDeviation: number;
};

export type FoodAnalyzeConfidenceRange95Percent = {
  min: number;
  max: number;
};

export type FoodAnalyzeRecipe = {
  id: number;
  title: string;
  imageType: string;
  sourceUrl: string;
};
