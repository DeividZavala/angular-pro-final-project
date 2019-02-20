import {Component} from "@angular/core";
import {Meal} from "../../../shared/services/meals.service";

@Component({
  selector: "meal",
  styleUrls: ["./meal.component.scss"],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg" alt="food">
          <span>Create meal</span>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"></meal-form>
      </div>
    </div>
  `
})
export class MealComponent{

  addMeal(event: Meal){
    console.log(event)
  }

}
