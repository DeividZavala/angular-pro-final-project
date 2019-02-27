import {Injectable} from "@angular/core";
import {Store} from "store";
import {AngularFireDatabase} from "angularfire2/database";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Meal} from "../meals/meals.service";
import {Workout} from "../workouts/workouts.service";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";

// interfaces
export interface ScheduleItem {
  meals: Meal[],
  workout: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService{

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();

  selected$ = this.section$.do(next => this.store.set("selected", next));

  schedule$: Observable<ScheduleItem[]> = this.date$
    .do((next: any) => this.store.set("date", next))
    .map((date: any) => {

      const startAt = (
        new Date(date.getFullYear(), date.getMonth(), date.getDate())
      ).getTime();

      const endAt = (
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      ).getTime() - 1;

      return {startAt, endAt}

    }).switchMap(({startAt, endAt}:any) => this.getSchedule(startAt, endAt))
    .map((data: any) => {

      console.log(data);

      const mapped: ScheduleList = {};
      for(const prop of data){
        if(!mapped[prop.section]){
          mapped[prop.section] = prop
        }
      }
      return mapped;

    }).do((next: any) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ){}

  get uid(){
    return this.authService.user.uid
  }

  selectSection(event: any){
    this.section$.next(event)
  }

  updateDate(date: Date){
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number){
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    })
  }

}
