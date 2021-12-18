import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.appUser$.pipe(
      map((user) =>
        user && user.isAdmin ? true : this.router.createUrlTree(['/'])
      ),
      shareReplay()
    );
  }
}
