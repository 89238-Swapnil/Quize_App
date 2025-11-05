import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  onLogin() {
    const success = this.auth.login(this.email, this.password);
    if (success) {
      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
