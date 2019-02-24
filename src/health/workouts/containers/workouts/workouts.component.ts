import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {Store} from "store";
import {Workout, WorkoutsService} from "../../../shared/services/workouts/workouts.service";

@Component({
  selector: "workouts",
  styleUrls: ["./workouts.component.scss"],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="/img/workout.svg" alt="workout svg">
          Your workouts
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../workouts/new']" >
          <img src="/img/add-white.svg" alt="add">
          New workouts
        </a>
      </div>

      <div *ngIf="workouts$ | async as workouts; else loading">
        <div class="message" *ngIf="!workouts.length">
          <img src="/img/face.svg" alt="face">
          No workouts, add a new workout to start
        </div>
        <list-item
          (remove)="removeWorkout($event)"
          *ngFor="let workout of workouts"
          [item]="workout"></list-item>
      </div>

      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" alt="loading">
          Fetching workouts...
        </div>
      </ng-template>

    </div>
  `
})
export class WorkoutsComponent implements OnInit, OnDestroy{

  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store
  ){}

  removeWorkout(event: Workout){
    this.workoutsService.removeWorkout(event.$key)
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workouts$ = this.store.select<Workout[]>("workouts");
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
