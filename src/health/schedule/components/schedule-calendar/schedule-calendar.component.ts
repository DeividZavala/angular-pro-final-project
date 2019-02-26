import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
  selector: "schedule-calendar",
  styleUrls: ["./schedule-calendar.component.scss"],
  template: `
    <div class="calendar">
      <schedule-controls 
        [selected]="selectedDay" 
        (move)="onChange($event)" ></schedule-controls>
      
      <schedule-days [selected]="selectedDayIndex" (select)="selectDay($event)"></schedule-days>
      
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges{

  selectedDay: Date;
  selectedDayIndex: Number;
  selectedWeek: Date;

  @Input()
  set date(date: Date){
    this.selectedDay = new Date(date.getTime())
  }

  @Output()
  change = new EventEmitter<Date>();

  ngOnChanges(){
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  selectDay(index: number){
    let selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  private getToday(date: Date){
    let today = date.getDay() - 1;
    if (today < 0){
      today = 6
    }
    return today;
  }


  onChange(weekOffset: number){
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date){
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

}
