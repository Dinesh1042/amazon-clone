import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'shared/models/user';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  user$: Observable<User | null | undefined>;
  loading = false;

  constructor(private userService: UserService) {
    this.loading = true;
    this.user$ = userService.appUser$.pipe(tap((_) => (this.loading = false)));
  }

  ngOnInit(): void {}
}
