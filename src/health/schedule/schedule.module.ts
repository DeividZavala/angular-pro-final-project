import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

// shared module
import {SharedModule} from "../shared/shared.module";

// components
import {ScheduleCalendarComponent} from "./components/schedule-calendar/schedule-calendar.component";
import {ScheduleControlsComponent} from "./components/schedule-controls/schedule-controls.component";
import {ScheduleDaysComponent} from "./components/schedule-day/schedule-days.component";
import {ScheduleSectionComponent} from "./components/schedule-section/schedule-section.component";
import {ScheduleAssignComponent} from "./components/schedule-assign/schedule-assign.component";

//containers
import {ScheduleComponent} from "./containers/schedule/schedule.component";

const ROUTER: Routes = [
  {path: "", component: ScheduleComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations:[
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent
  ]
})
export class ScheduleModule{}
