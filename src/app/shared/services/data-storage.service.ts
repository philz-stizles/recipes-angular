import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from '../../recipes/recipe.model';
import { map, tap } from 'rxjs';

// Marking a class with @Injectable ensures that the compiler will generate the necessary metadata
// to create the class's dependencies when the class is injected.
@Injectable({
  providedIn: 'root', // Shortcut to providing it in the module providers: []
})
export class DataStorageService {
  baseUrl = 'https://devdezyn-f8967-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes = () => {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put(`${this.baseUrl}/recipes.json`, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  };

  fetchRecipes = () => {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes.json`).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  };
}
