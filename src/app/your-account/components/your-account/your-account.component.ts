import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.userService.appUser$.subscribe(
        this.handleUserSuccess.bind(this),
        this.handleUserSuccess.bind(this)
      )
    );
    this.titleService.setTitle('Your Account - Amazon');
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
    this.subscriptions.unsubscribe();
  }
}
