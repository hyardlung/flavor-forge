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
  diets: [];
}

export interface mealType {
  name: string;
  icon: string;
}
