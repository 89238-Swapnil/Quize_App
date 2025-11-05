import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(private auth: AuthService, private router: Router) { }

  // ✅ Expose login state to the template
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  // ✅ Logout user and navigate home
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
