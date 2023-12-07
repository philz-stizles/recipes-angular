import { EventEmitter, Injectable, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   'Tasty Schnitzel',
    //   'A super-tasty Schnitzel - just awesome!',
    //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //   [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    // ),
    // new Recipe(
    //   'Big Fat Burger',
    //   'What else you need to say?',
    //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //   [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    // ),
  ];
  private shoppingListService: ShoppingListService;

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // We slice "this.recipes" to avoid sending a direct reference
    // to the recipes array which could otherwise undergo unwanted changes outside the service.
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index]; // We slice "this.recipes" to avoid sending a direct reference
    // to the recipes array which could otherwise undergo unwanted changes outside the service.
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
