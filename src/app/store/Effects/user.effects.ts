import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {getCurrentUser, logIn, logOut, setCurrentUser} from "../Entities/User/user.actions";
import {CookieService} from "ngx-cookie-service";
import {userIdCookies} from "../../definitions";
import {UserService} from "../../services/User.service";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private cookieService: CookieService,
  ) {
  }

  logIn$ = createEffect(() => this.actions$
    .pipe(ofType(logIn),
      mergeMap(action => {
        this.cookieService.set(userIdCookies, action.user.google_id);
        return of(getCurrentUser({user: action.user}));
      })
    )
  );

  logOut$ = createEffect(() => this.actions$
    .pipe(ofType(logOut),
      mergeMap(action => {
        this.cookieService.delete(userIdCookies);
        return of({type: 'Logged out'});
      })
    )
  );

  getCurrentUser$ = createEffect(() => this.actions$
    .pipe(ofType(getCurrentUser),
      mergeMap((action) => this.userService.getCurrentUser(action.user)
        .pipe(
          map(user => setCurrentUser({user: user})),
          catchError(() => {
            return of({type: 'Unable to load current user'});
          }),
        )
      )
    )
  );
}
