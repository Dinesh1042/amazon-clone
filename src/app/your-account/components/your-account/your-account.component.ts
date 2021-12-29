import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.scss'],
})
export class YourAccountComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  navigate(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  logout() {
    this.authService.signOut();
  }
}
