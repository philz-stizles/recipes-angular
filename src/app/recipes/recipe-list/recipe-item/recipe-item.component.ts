import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Input('recipeItem') recipe: Recipe | null = null;
  @Input('index') id?: number;
  @Output() recipeSelected = new EventEmitter<void>();

  // constructor(
  //   private recipesService: RecipesService,
  //   private activeRoute: ActivatedRoute
  // ) {}

  // onSelected = () => {
  //   this.recipeSelected.emit();
  //   // this.recipesService.recipeSelected.emit(this.recipe!);
  //   // this.recipesService.recipeSelected.next(this.recipe!);
  // };
}
