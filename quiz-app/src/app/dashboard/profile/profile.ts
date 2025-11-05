import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule],
    template: `
    <h2>Profile</h2>
    <form (ngSubmit)="updateProfile()" class="mt-3">
      <div class="mb-3">
        <label>Name</label>
        <input [(ngModel)]="user.name" name="name" class="form-control" />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input [(ngModel)]="user.email" name="email" class="form-control" disabled />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input [(ngModel)]="user.password" name="password" type="password" class="form-control" />
      </div>
      <button class="btn btn-success">Update</button>
    </form>
  `,
})
export class Profile {
    user = JSON.parse(localStorage.getItem('user') || '{}');

    updateProfile() {
        localStorage.setItem('user', JSON.stringify(this.user));
        alert('Profile updated successfully!');
    }
}
