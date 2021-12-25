import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthCanLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user) => !user),
      take(1)
    );
  }
}
