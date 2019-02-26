import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "schedule-controls",
  styleUrls: ["./schedule-controls.component.scss"],
  template: `
    <div class="controls">
      
      <button type="button" class="button" (click)="onChange(offset - 1)">
        <img src="img/chevron-left.svg">
      </button>
      
      <p>{{selected | date: 'yMMMMd'}}</p>

      <button type="button" class="button" (click)="onChange(offset + 1)">
        <img src="img/chevron-right.svg">
      </button>
      
    </div>
  `
})
export class ScheduleControlsComponent{

  offset = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  onChange(offset: number){
    this.offset = offset;
    this.move.emit(offset);
  }

}
