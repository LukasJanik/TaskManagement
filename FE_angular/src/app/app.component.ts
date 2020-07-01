import {Component} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {User} from './store/Entities/User/user.model';
import {Observable} from 'rxjs';
import {currentUser, State} from './store';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {logOut} from './store/Entities/User/user.actions';

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
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>) {
    this.user$ = this.store.select(currentUser);
  }

  signOut(): void {
    this.authService.signOut();
    this.store.dispatch(logOut());
    this.router.navigate(['/login']);
  }
}
