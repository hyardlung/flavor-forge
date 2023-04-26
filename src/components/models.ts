export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface HeaderLink {
  label: string;
  value: string;
  to: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  diets: string[];
}

export interface Ingredient {
  id: number;
  name: string;
  image: string;
  amount: number;
  unit: string;
}

export interface RecipeInformation {
  id: number | string;
  title: string;
  image: string;
  summary: string;
  dishTypes: string[];
  diets: string[];
  extendedIngredients: Ingredient[];
}

export interface mealType {
  name: string;
  icon: string;
}

export interface findedRecipe {
  id: number;
  title: string;
  image: string;
}
