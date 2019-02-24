import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "list-item",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./list-item.component.scss"],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)" >
        <p class="list-item__name">{{item.name}}</p>
        <p class="list-item__ingredients">
          <span *ngIf="item.ingredients; else showWorkout" >{{item.ingredients | join}}</span>
        </p>
        <ng-template #showWorkout>
          <span>{{ item | workout }}</span>
        </ng-template>
      </a>
      
      <div
        class="list-item__delete"
        *ngIf="toggled"
      >
        <p>Delete item?</p>
        <button class="confirm" (click)="removeItem()" type="button">Yes</button>
        <button class="cancel" (click)="toggle()" type="button">No</button>
      </div>
      
      <button
        (click)="toggle()"
        class="trash">
        <img src="/img/remove.svg" alt="remove">
      </button>
      
    </div>
  `
})
export class ListItemComponent{

  toggled: boolean = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  toggle(){
    this.toggled = !this.toggled;
  }

  removeItem(){
    this.remove.emit(this.item);
  }

  getRoute(item:any){
    return [`../${item.ingredients ? "meals" : "workouts" }`, item.$key];
  }

}
