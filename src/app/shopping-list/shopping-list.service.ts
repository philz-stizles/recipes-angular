import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<number>();
  private ingredients: Ingredient[] = [];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // We slice "this.ingredients" to avoid sending a direct reference
    // to the ingredients array which could otherwise undergo unwanted changes outside the service.
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  editIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
