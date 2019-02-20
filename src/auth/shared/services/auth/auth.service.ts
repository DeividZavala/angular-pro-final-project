import {Injectable} from "@angular/core";
import 'rxjs/add/operator/do';
import {AngularFireAuth} from "angularfire2/auth";
import {Store} from "store";

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService{

  auth$ = this.af.authState.do(next => {
    if(!next){
      return this.store.set("user", null)
    }
    const {email, uid} = next;
    const user: User = {
      email,
      uid,
      authenticated: true
    };
    this.store.set("user", user);
  });

  constructor(
    private af: AngularFireAuth,
    private store: Store
  ){}

  get authState(){
    return this.af.authState;
  }

  get user(){
    return this.af.auth.currentUser;
  }

  createUser(email: string, password: string){
    return this.af.auth.createUserWithEmailAndPassword(email, password)
  }

  logout(){
    return this.af.auth.signOut();
  }

  loginUser(email: string, password: string){
    return this.af.auth.signInWithEmailAndPassword(email, password)
  }

}
