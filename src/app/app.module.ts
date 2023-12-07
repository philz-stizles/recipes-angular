import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { BasicHighlightDirective } from './shared/directives/basic-highlight.directive';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HighlighterDirective } from './shared/directives/highlighter.directive';
import { HoverHighlighterDirective } from './shared/directives/hover-highlighter.directive';
import { AlertComponent } from './shared/components/alert/alert.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { UnlessDirective } from './shared/directives/unless.directive';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoggingInterceptorService } from './shared/services/logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    BasicHighlightDirective,
    ShortenPipe,
    FilterPipe,
    HighlighterDirective,
    HoverHighlighterDirective,
    AlertComponent,
    RecipeEditComponent,
    UnlessDirective,
    DropdownDirective,
    RecipeStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ShoppingListService,
    // When providing Interceptors, order matters.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
