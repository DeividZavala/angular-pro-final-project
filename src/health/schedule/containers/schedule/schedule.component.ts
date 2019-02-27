import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {ScheduleItem, ScheduleService} from "../../../shared/services/schedule/schedule.service";
import {Store} from "store";

@Component({
  selector: "meals",
  styleUrls: ["./schedule.component.scss"],
  template: `
    <div class="schedule">
      <schedule-calendar 
        [date]="date$ | async" 
        [items]="schedule$ | async"
        (change)="changeDate($event)" 
        (select)="changeSection($event)"></schedule-calendar>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy{

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ){}

  ngOnInit(){

    this.date$ = this.store.select("date");
    this.schedule$ = this.store.select("schedule");

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
    ]
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeSection(event: any){
    console.log(event);
    this.scheduleService.selectSection(event);
  }

  changeDate(date: Date){
    this.scheduleService.updateDate(date);
  }

}
