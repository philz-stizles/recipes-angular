import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientsSub: Subscription | null = null;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSub = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditIngredient = (index: number) => {
    this.shoppingListService.ingredientSelected.next(index);
  };

  ngOnDestroy(): void {
    this.ingredientsSub && this.ingredientsSub.unsubscribe();
  }

  onIngredientAdded = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
  };
}
