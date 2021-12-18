import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthSuccessService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateUser() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    this.router.navigate([returnUrl ? returnUrl : '/']);
  }
}
