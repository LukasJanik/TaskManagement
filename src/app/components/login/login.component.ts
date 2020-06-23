import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {logIn} from "../../store/Entities/User/user.actions";
import {User} from "../../store/Entities/User/user.model";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authServiceSub: Subscription;

  constructor(
    private authService: SocialAuthService,
    private store: Store<State>,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit(): void {
    this.authServiceSub = this.authService.authState.subscribe((user) => {
      const currentUser: User = Object.assign({}, { id: null,  google_id: user.id, name: user.name, email: user.email, photo_url: user.photoUrl});
      this.store.dispatch(logIn({user: currentUser}));
      this.router.navigate(['tasks']);
    });
  }

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }

}
