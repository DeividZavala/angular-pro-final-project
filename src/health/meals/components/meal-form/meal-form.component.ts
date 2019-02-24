import {Component, EventEmitter, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input} from "@angular/core";
import {FormArray, FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Meal} from "../../../shared/services/meals.service";

@Component({
  selector: "meal-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./meal-form.component.scss"],
  template: `
    <div class="meal-form">
      <form [formGroup]="form" >
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input type="text" placeholder="e.g. Mexican breakfast" formControlName="name">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>
        
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button type="button" 
                    class="meal-form__add" 
                    (click)="addIngredient()">
              <img src="/img/add-white.svg" alt="add">
              Add food
            </button>
          </div>

          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i;">
              <input [formControlName]="i" placeholder="e.g. Eggs">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createMeal()">
              Create meal
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateMeal()">
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>
          
          <div class="meal-form__delete">
            <div *ngIf="toggled">
              <p>Delete Meal?</p>
              <button class="confirm" (click)="removeMeal()" type="button">Yes</button>
              <button class="cancel" (click)="toggle()" type="button">No</button>
            </div>

            <button
              (click)="toggle()"
              class="button button--delete">
              Delete
            </button>
          </div>
          
        </div>
        
      </form>
    </div>
  `
})
export class MealFormComponent implements OnChanges{

  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder
  ){}

  ngOnChanges(changes: SimpleChanges) {
    if(this.meal && this.meal.name){

      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if(value.ingredients){
        value.ingredients.forEach(ingredient => {
          this.ingredients.push(new FormControl(ingredient));
        })
      }

    }
  }

  emptyIngredients(){
    while(this.ingredients.controls.length){
      this.ingredients.removeAt(0);
    }
  }

  get required(){
    return (
      this.form.get("name").hasError("required") &&
      this.form.get("name").touched
    )
  }

  get ingredients(){
    return this.form.get("ingredients") as FormArray;
  }

  addIngredient(){
    this.ingredients.push(new FormControl([""]))
  }

  removeIngredient(index: number){
    this.ingredients.removeAt(index);
  }

  createMeal(){
    if(this.form.valid){
      this.create.emit(this.form.value);
    }
  }

  updateMeal(){
    if(this.form.valid){
      this.update.emit(this.form.value);
    }
  }

  removeMeal(){
    this.remove.emit(this.form.value);
  }

  toggle(){
    this.toggled = !this.toggled;
  }

}
