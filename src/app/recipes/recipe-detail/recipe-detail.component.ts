import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  // @Input('selectedRecipe') recipe: Recipe | null = null;
  recipe?: Recipe;
  id!: number;
  private recipesService: RecipesService;
  private activeRoute: ActivatedRoute;
  private router: Router;

  constructor() {
    // Alternative injection syntax
    this.recipesService = inject(RecipesService);
    this.activeRoute = inject(ActivatedRoute);
    this.router = inject(Router);
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onNavigateToEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute }); // this.activeRoute is already at '/recipes/:id'
    // So just add 'edit'
  }

  onDeleteRecipe() {
    this.recipesService?.deleteRecipe(this.id);
    this.router.navigateByUrl('/recipes');
  }

  onAddToShoppingList = () => {
    this.recipesService?.addIngredientsToShoppingList(this.recipe!.ingredients);
  };
}
