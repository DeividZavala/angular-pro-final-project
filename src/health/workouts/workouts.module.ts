import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

//containers
import {WorkoutsComponent} from "./containers/workouts/workouts.component";

const ROUTER: Routes = [
  {path: "", component: WorkoutsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    ReactiveFormsModule
  ],
  declarations:[
    WorkoutsComponent
  ]
})
export class WorkoutsModule{}
