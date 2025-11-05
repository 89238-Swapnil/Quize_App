import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="d-flex">
      <!-- Sidebar -->
      <div class="sidebar bg-light p-3" style="width:250px; height:100vh;">
        <h4>Quiz Dashboard</h4>
        <hr />
        <ul class="nav flex-column">
          <li><a routerLink="categories" class="nav-link">Quiz Categories</a></li>
          <li><a routerLink="profile" class="nav-link">Profile</a></li>
          <li><button class="btn btn-danger mt-3" (click)="logout()">Logout</button></li>
        </ul>
      </div>

      <!-- Content Area -->
      <div class="content flex-grow-1 p-4">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class Dashboard {
  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
