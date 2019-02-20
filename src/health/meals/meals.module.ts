import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

//containers
import {MealsComponent} from "./containers/meals/meals.component";
import {MealComponent} from "./containers/meal/meal.component";
import {MealFormComponent} from "./components/meal-form/meal-form.component";

const ROUTER: Routes = [
  {path: "", component: MealsComponent},
  {path: "new", component: MealComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    ReactiveFormsModule
  ],
  declarations:[
    MealsComponent,
    MealComponent,
    MealFormComponent
  ]
})
export class MealsModule{}
