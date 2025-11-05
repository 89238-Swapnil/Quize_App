import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignUp {
  user = { name: '', email: '', password: '' };
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    // ✅ 1. Basic validation
    if (!this.user.name || !this.user.email || !this.user.password) {
      alert('Please fill all fields.');
      return;
    }

    this.isLoading = true;

    // ✅ 2. Call signup API from AuthService
    this.auth.signup(this.user).subscribe({
      next: (res) => {
        console.log('✅ Signup success:', res);
        alert('Signup successful! Please login now.');
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Signup error:', err);
        alert(err.error?.message || 'Signup failed. Try again later.');
        this.isLoading = false;
      }
    });
  }
}
