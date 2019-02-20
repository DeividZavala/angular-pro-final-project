import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Store} from 'store'
import {AuthService} from "../../../auth/shared/services/auth/auth.service";
import {AngularFireDatabase} from "angularfire2/database";


// interfaces
export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exist: () => boolean
}

@Injectable()
export class MealsService{

  meals$:Observable<Meal[]> = this.db.list(`/meals/${this.uid}`)
    .do(next=> this.store.set("meals", next));

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private store: Store
  ){}

  get uid(){
    return this.authService.user.uid
  }

  addMeal(meal: Meal){
    return this.db.list(`/meals/${this.uid}`).push(meal);
  }

}
