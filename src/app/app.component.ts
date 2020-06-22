import {Component} from '@angular/core';
import {SocialAuthService} from "angularx-social-login";
import {User} from "./store/Entities/User/user.model";
import {Observable} from "rxjs";
import {currentUser, State} from "./store";
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {userIdCookies} from "./definitions";
import {getCurrentUser} from "./store/Entities/User/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list';

  user$: Observable<User>;

  constructor(
    private authService: SocialAuthService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<State>) {
    this.user$ = this.store.pipe(select(currentUser),
      map(user => {
        const googleId = this.cookieService.get(userIdCookies);
        if (user === null && googleId === null) {
          router.navigate(['login']);
        } else if (!!googleId) {
          this.store.dispatch(getCurrentUser({user: {googleId}}));
        }
        return user;
      }));
  }

  signOut(): void {
    this.authService.signOut();
    this.cookieService.delete(userIdCookies);
  }

}
