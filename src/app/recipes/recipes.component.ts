import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  // providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe | null = null;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.recipeSelected.subscribe((recipe) => {
      // this.selectedRecipe = recipe;
    });
  }
}
