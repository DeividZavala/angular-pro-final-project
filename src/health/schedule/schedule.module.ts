import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

//containers
import {ScheduleComponent} from "./containers/schedule/schedule.component";

const ROUTER: Routes = [
  {path: "", component: ScheduleComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    ReactiveFormsModule
  ],
  declarations:[
    ScheduleComponent
  ]
})
export class ScheduleModule{}
