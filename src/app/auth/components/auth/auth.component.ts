import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';

import { AuthErrorService } from '../../services/auth-error.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private signInURL = 'signin';
  private subscriptions = new Subscription();

  isSignUrl = this.router.url.includes(this.signInURL);
  authError: Observable<string | null> = of(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private authErrorService: AuthErrorService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events
        .pipe(filter((events) => events instanceof NavigationEnd))
        .subscribe(
          (event: any) => (this.isSignUrl = event.url.includes(this.signInURL))
        )
    );

    this.authError = this.authErrorService.authError$;
  }

  removeAuthError() {
    this.authErrorService.removeAuthError();
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
