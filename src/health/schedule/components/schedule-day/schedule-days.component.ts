import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "schedule-days",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./schedule-day.component.scss"],
  template: `
    <div class="days">
      <button class="day" *ngFor="let day of days; index as i" (click)="selectDay(i)">
        <span [class.active]="i === selected">{{ day }}</span>
      </button>
    </div>
  `
})
export class ScheduleDaysComponent{

  days = ["L", "M", "M", "J", "V", "S", "D"];

  @Input()
  selected: Number;

  @Output()
  select = new EventEmitter<number>();

  selectDay(index: number){
    this.select.emit(index);
  }

}
