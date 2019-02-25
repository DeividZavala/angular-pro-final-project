import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

// thirt-party modules
import {AngularFireDatabaseModule} from "angularfire2/database";

// services
import {MealsService} from "./services/meals/meals.service";
import {WorkoutsService} from "./services/workouts/workouts.service";
import {ScheduleService} from "./services/schedule/schedule.service";

// components
import {ListItemComponent} from "./components/list-item/list-item.component";

// Pipes
import {JoinPipe} from "./pipes/join.pipe";
import {WorkoutPipe} from "./pipes/workout.pipe";


@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  exports:[
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule{
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers:[
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    }
  }
}
