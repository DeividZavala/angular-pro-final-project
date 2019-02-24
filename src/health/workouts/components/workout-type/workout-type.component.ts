import {ChangeDetectionStrategy, Component, forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const TYPE_CONTROLL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: "workout-type",
  providers: [TYPE_CONTROLL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./workout-type.component.scss"],
  template: `
    <div class="workout-type">
      <div class="workout-type__pane" 
           [class.active]="selector === value"
           *ngFor="let selector of selectors" 
           (click)="setSelector(selector)">
        <img src="/img/{{selector}}.svg" alt="{{selector}}">
        <p>{{selector}}</p>
      </div>
    </div>
  `
})
export class WorkoutTypeComponent implements ControlValueAccessor{
  selectors = ["strength", "endurance"];

  value: string;

  private onModelChange: Function;
  private onTouch: Function;

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  setSelector(value: string){
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }

}
