import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'shared/models/user';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;
  pageLoading = false;
  error: Error | null = null;

  private subscriptions = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.pageLoading = true;

    this.subscriptions.add(
      this.userService.appUser$.subscribe(
        this.handleGETUserSuccess.bind(this),
        this.handleGETUserError.bind(this)
      )
    );
  }

  private handleGETUserSuccess(user: User) {
    this.user = user;
    this.pageLoading = false;
  }

  private handleGETUserError(error: Error) {
    this.error = error;
    this.pageLoading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
