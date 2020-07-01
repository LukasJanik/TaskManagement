import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {currentUser, State} from '../store';
import {CookieService} from 'ngx-cookie-service';
import {userIdCookies} from '../definitions';
import {getCurrentUser} from '../store/Entities/User/user.actions';
import {User} from '../store/Entities/User/user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGuard implements CanActivate {

  constructor(
    private store: Store<State>,
    private cookieService: CookieService,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const googleId = this.cookieService.get(userIdCookies);
    if (!googleId) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.setCurrentUser(googleId).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

  private setCurrentUser(google_id: string): Observable<User> {
    return this.store.select(currentUser).pipe(
      tap((user: User) => {
        if (!user) {
          this.store.dispatch(getCurrentUser({user: {google_id}}));
        }
      }),
      filter((user: User) => !!user),
      take(1),
    );
  }
}
