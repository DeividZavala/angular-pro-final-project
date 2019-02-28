import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Meal} from "../../../shared/services/meals/meals.service";
import {Workout} from "../../../shared/services/workouts/workouts.service";

@Component({
  selector: "schedule-assign",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./schedule-assign.component.scss"],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        
        <div class="schedule-assign__title">
          <h1>
            <img src="/img/{{section.type === 'workouts' ? 'workout' : 'food'}}.svg" alt="{{section.type === 'workouts' ? 'workout' : 'food'}}">
            Assign {{section.type}}
          </h1>
          <a class="btn__add" [routerLink]="getRoute(section.type)">
            <img src="/img/add-white.svg" alt="add">
            New {{section.type}}
          </a>
        </div>
        
        <div class="schedule-assign__list">
          <span 
              class="schedule-assign__empty" 
              *ngIf="!list?.length">
            Nothing here to assign
          </span>
          <div 
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)"
          >
            {{item.name}}
          </div>
        </div>
        
        <div class="schedule-assign__submit">
          <div>
            <button class="button" type="button" (click)="updateAssign()">Update</button>
            <button class="button button--cancel" type="button" (click)="cancelAssign()">Cancel</button>
          </div>
        </div>
        
      </div>
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit{

  private selected: string[] = [];

  @Input()
  section: any;
  @Input()
  list: Meal[] | Workout[];

  @Output()
  cancel= new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();

  getRoute(name: string){
    return [`../${name}/new`]
  }

  constructor(){}

  ngOnInit(){
    this.selected = [...this.section.assigned];
  }

  exists(name: string){
    return !!~this.selected.indexOf(name)
  }

  toggleItem(name: string){
    if(this.exists(name)){
      this.selected = this.selected.filter(item => item !== name);
    }else{
      this.selected = [...this.selected, name];
    }
  }

  updateAssign(){
    this.update.emit({
      [this.section.type]: this.selected
    })
  }

  cancelAssign(){
    this.cancel.emit();
  }

}
