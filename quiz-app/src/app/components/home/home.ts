import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToQuiz() {
    this.router.navigate(['/quiz']);
  }
}
