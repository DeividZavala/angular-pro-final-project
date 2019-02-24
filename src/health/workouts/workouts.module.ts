import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

//containers
import {WorkoutsComponent} from "./containers/workouts/workouts.component";
import {WorkoutComponent} from "./containers/workout/workout.component";

//components
import {WorkoutFormComponent} from "./components/workout-form/workout-form.component";
import {WorkoutTypeComponent} from "./components/workout-type/workout-type.component";

const ROUTER: Routes = [
  {path: "", component: WorkoutsComponent},
  {path: "new", component: WorkoutComponent},
  {path: ":id", component: WorkoutComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    ReactiveFormsModule,
    SharedModule.forRoot()
  ],
  declarations:[
    WorkoutsComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent
  ]
})
export class WorkoutsModule{}
