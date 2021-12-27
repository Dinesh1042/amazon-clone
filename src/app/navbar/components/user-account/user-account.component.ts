import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'shared/models/user';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  user?: User;
  loading = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.add(
      this.userService.appUser$.subscribe(
        this.handleUser.bind(this),
        this.handleUserError.bind(this)
      )
    );
  }

  private handleUser(user: User) {
    this.user = user;
    this.loading = false;
  }

  private handleUserError(error: Error) {
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
