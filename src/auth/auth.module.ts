import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

// Firebase modules
import {AngularFireModule, FirebaseAppConfig} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";

// Shared Module
import {SharedModule} from "./shared/shared.module";

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyB-PzeEwLd_IuNAoHmK63SavPHeaFHNPAA",
  authDomain: "gimpsa-admin.firebaseapp.com",
  databaseURL: "https://gimpsa-admin.firebaseio.com",
  projectId: "gimpsa-admin",
  storageBucket: "gimpsa-admin.appspot.com",
  messagingSenderId: "4515270021"
};


export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      {path: "", pathMatch: "full", redirectTo: "login"},
      {path: "login", loadChildren: "./login/login.module#LoginModule"},
      {path: "register", loadChildren: "./register/register.module#RegisterModule"}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
