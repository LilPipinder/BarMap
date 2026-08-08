import { Routes } from '@angular/router';
import { CocktailList } from './components/cocktail-list/cocktail-list';
import { CocktailForm } from './components/cocktail-form/cocktail-form';
import { CocktailDetail } from './components/cocktail-detail/cocktail-detail';

export const routes: Routes = [
  { path: '', component: CocktailList },
  { path: 'create', component: CocktailForm },
  { path: 'edit/:id', component: CocktailForm },
  { path: 'view/:id', component: CocktailDetail },
  { path: '**', redirectTo: '' }
];
