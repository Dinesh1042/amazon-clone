import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminCanLoadGuard implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.userService.appUser$.pipe(
      map((user) => !!user?.isAdmin),
      shareReplay(1),
      take(1)
    );
  }
}
