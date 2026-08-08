export interface Cocktail {
  id: string;
  name: string;
  description: string;
  steps: CocktailStep[];
  finalImage?: string; 
  createdAt: string; 
  updatedAt?: string;
}
