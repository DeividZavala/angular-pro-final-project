import {Component, OnDestroy, OnInit} from "@angular/core";
import {Meal, MealsService} from "../../../shared/services/meals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: "meal",
  styleUrls: ["./meal.component.scss"],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg" alt="food">
          <span *ngIf="meal$ | async as meal; else title">{{meal.name ? "Edit" : "Create"}} meal</span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"></meal-form>
      </div>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy{

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params
      .switchMap(param => this.mealsService.getMeal(param.id))
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal){
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  backToMeals(){
    this.router.navigate(["meals"])
  }

}
