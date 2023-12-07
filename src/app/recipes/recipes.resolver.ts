import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStorageService } from './../shared/services/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.dataStorageService.fetchRecipes();
  }
}

export const recipesResolver: ResolveFn<boolean> = (route, state) => {
  let dataStorageService = inject(DataStorageService);
  dataStorageService.fetchRecipes();
  return true;
};
