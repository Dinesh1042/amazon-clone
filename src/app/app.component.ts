import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthUrl = false;
  private authURL = 'auth';
  private routeEventSubscription!: Subscription;
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routeEventSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        (navigationEnd: any) =>
          (this.isAuthUrl = navigationEnd.url.includes(this.authURL))
      );
  }

  ngOnDestroy() {
    this.routeEventSubscription.unsubscribe();
  }
}
