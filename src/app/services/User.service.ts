import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {User} from "../store/Entities/User/user.model";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserService {

  public constructor(private httpClient: HttpClient) {
  }

  /** upserts and returns user
   * @returns user object
   */
  public getCurrentUser(user: User): Observable<User> {
    const finalPath = `${environment.host()}/api/users/${user.google_id}`;
    return this.httpClient.put(finalPath, user, {observe: 'response'}).pipe(
      map(resp => {
        const user = resp.body as User;
        return user;
      })
    );

    // return this.httpClient.put(finalPath, user, {observe: 'response'});
  }
}
