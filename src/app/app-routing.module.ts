import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { AuthGuard } from './auth/auth.guard';
// import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // { path: 'auth', component: AuthComponent },
  // {
  //   path: 'recipes',
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', component: RecipeStartComponent },
  //     {
  //       path: 'new',
  //       component: RecipeEditComponent,
  //       canDeactivate: [CanDeactivateGuard],
  //     },
  //     { path: ':id', component: RecipeDetailComponent }, // From specific to general, ensure ':id' comes after 'new'
  //     { path: ':id/edit', component: RecipeEditComponent },
  //   ],
  // },
  // { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },

  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
