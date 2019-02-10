import {Component, EventEmitter, Input, Output} from "@angular/core";
import {User} from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: "app-header",
  styleUrls: ["./app-header.component.scss"],
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/img/logo.svg" alt="logo">
        <div 
          class="app-header__user-info"
          *ngIf="user?.authenticated">
          <span (click)="logoutUser()" ></span>
        </div>
      </div>
    </div>
  `
})

export class AppHeaderComponent{
  @Output()
  logout = new EventEmitter<any>();

  @Input()
  user:User;

  logoutUser(){
    this.logout.emit();
  }

}
