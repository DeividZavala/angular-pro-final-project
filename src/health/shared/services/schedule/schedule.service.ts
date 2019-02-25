import {Injectable} from "@angular/core";
import {Store} from "store";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ScheduleService{

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any[]> = this.date$
    .do((next: any) => {
      this.store.set("date", next);
    });

  constructor(
    private store: Store
  ){}

}
