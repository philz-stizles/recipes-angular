import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { AuthComponent } from './auth/auth.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';

// import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
// import { AlertComponent } from './shared/components/alert/alert.component';
import { BasicHighlightDirective } from './shared/directives/basic-highlight.directive';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HighlighterDirective } from './shared/directives/highlighter.directive';
import { HoverHighlighterDirective } from './shared/directives/hover-highlighter.directive';
import { UnlessDirective } from './shared/directives/unless.directive';
// import { DropdownDirective } from './shared/directives/dropdown.directive';
// import { PlaceholderDirective } from './shared/directives/placeholder.directive';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoggingInterceptorService } from './shared/services/logging-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent,
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeEditComponent,
    // RecipeStartComponent,

    // ShoppingListComponent,
    // ShoppingEditComponent,
    HeaderComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    BasicHighlightDirective,
    ShortenPipe,
    FilterPipe,
    HighlighterDirective,
    HoverHighlighterDirective,
    UnlessDirective,
    // DropdownDirective,
    // PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
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
