import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

// thirt-party modules
import {AngularFireDatabaseModule} from "angularfire2/database";

// services
import {MealsService} from "./services/meals/meals.service";
import {WorkoutsService} from "./services/workouts/workouts.service";

// components
import {ListItemComponent} from "./components/list-item/list-item.component";

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent
  ],
  exports:[
    ListItemComponent
  ]
})
export class SharedModule{
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers:[
        MealsService,
        WorkoutsService
      ]
    }
  }
}
