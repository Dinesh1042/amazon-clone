import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(private userService: UserService) {}

  canLoad(): Observable<boolean> {
    return this.userService.appUser$.pipe(map((user) => !!user?.isAdmin));
  }
}
