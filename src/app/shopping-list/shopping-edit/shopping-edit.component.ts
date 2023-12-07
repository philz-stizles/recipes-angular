import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameRef', { static: false }) nameRef!: ElementRef;
  // @ViewChild('amountRef', { static: false }) amountRef!: ElementRef
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  ingredientSelectedSub!: Subscription;
  id!: number;
  selectedIngredient!: Ingredient;
  editMode = false;
  @ViewChild('shoppingForm', { static: false }) shoppingForm!: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientSelectedSub =
      this.shoppingListService.ingredientSelected.subscribe((index) => {
        this.editMode = true;
        this.id = index;
        this.selectedIngredient = this.shoppingListService.getIngredient(
          this.id
        );
        this.shoppingForm.setValue(this.selectedIngredient);
      });
  }

  ngOnDestroy() {
    this.ingredientSelectedSub.unsubscribe();
  }

  onClear(form?: NgForm) {
    // form.reset();
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.id);
    this.onClear();
  }

  // onAdd = (form: NgForm) => {
  //   const name = this.nameRef!.nativeElement.value;
  //   const amount = this.amountRef!.nativeElement.value;
  //   const ingredient = new Ingredient(name, amount);
  //   this.ingredientAdded.emit(ingredient);
  //   // this.shoppingListService.addIngredient(new Ingredient(name, amount));
  // };

  onSubmit(form: NgForm) {
    // this.ingredientAdded.emit(ingredient);
    // const name = form.value['name'];
    // const amount = form.value['amount'];
    // const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      // this.shoppingListService.editIngredient(this.id, ingredient);
      this.shoppingListService.editIngredient(this.id, form.value);
    } else {
      // this.shoppingListService.addIngredient(ingredient);
      this.shoppingListService.addIngredient(form.value);
    }
  }
}

