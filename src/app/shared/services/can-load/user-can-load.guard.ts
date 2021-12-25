import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserCanLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    [segment]: UrlSegment[]
  ): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      map((user) =>
        user
          ? true
          : this.router.createUrlTree(['/auth/signin'], {
              queryParams: { returnUrl: segment.path },
            })
      ),
      take(1)
    );
  }
}
