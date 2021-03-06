import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "store";
import {AuthService, User} from "../../../auth/shared/services/auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <app-header [user]="user$ | async" (logout)="onLogout()"></app-header>
      <app-nav *ngIf="(user$ | async)?.authenticated"></app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  async onLogout(){
    await this.authService.logout();
    this.router.navigate(["/auth/login"])
  }

  ngOnInit(){
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>("user");
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
