import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'shared/models/user';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss'],
})
export class YourAccountComponent implements OnInit, OnDestroy {
  user?: User;
  pageLoading = false;
  error: Error | null = null;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscription.add(
      this.userService.appUser$.subscribe(
        this.handleUserSuccess.bind(this),
        this.handleUserSuccess.bind(this)
      )
    );
  }

  private handleUserSuccess(user: User) {
    this.user = user;
    this.pageLoading = false;
  }

  private handleUserError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  navigate(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  logout() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
