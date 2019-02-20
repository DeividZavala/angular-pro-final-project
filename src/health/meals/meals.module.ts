import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

//containers
import {MealsComponent} from "./containers/meals/meals.component";

const ROUTER: Routes = [
  {path: "", component: MealsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    ReactiveFormsModule
  ],
  declarations:[
    MealsComponent
  ]
})
export class MealsModule{}
