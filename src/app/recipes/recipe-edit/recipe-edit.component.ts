import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

// This form uses Reactive Forms - make sure to import the ReactiveFormsModule
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm!: FormGroup;
  editMode = false;
  id?: number;

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    // this.activeRoute.snapshot.params['id']; // This will not always work.
    this.activeRoute.params.subscribe((params: Params) => {
      // Fetching reactively
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.editMode && this.id !== undefined) {
      this.recipesService.editRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  private initForm(): void {
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray<FormGroup>([]);

    console.log('this.editMode', this.editMode);

    if (this.editMode) {
      const existingRecipe = this.recipesService.getRecipe(this.id!);
      name = existingRecipe.name;
      description = existingRecipe.description;
      imagePath = existingRecipe.imagePath;

      existingRecipe.ingredients.forEach((ingredient) => {
        ingredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients,
    });
  }
}
