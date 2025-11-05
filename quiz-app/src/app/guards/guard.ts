import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
