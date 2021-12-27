import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthCanLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      map((user) => (!user ? true : this.router.createUrlTree(['/']))),
      take(1)
    );
  }
}
