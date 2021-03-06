import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Store} from 'store'
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
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

  getMeal(key: string){
    if(!key) return Observable.of({});
    return this.store.select<Meal[]>("meals")
      .filter(Boolean)
      .map(meals => meals.find((meal:Meal) => meal.$key === key));
  }

  addMeal(meal: Meal){
    return this.db.list(`/meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal){
    return this.db.object(`/meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string){
    this.db.list(`/meals/${this.uid}`).remove(key);
  }

}
