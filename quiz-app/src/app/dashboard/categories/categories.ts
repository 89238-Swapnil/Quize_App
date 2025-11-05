import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="text-center flex-grow-1 text-primary fw-bold">Quiz Categories</h2>
       
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-3 mb-4" *ngFor="let cat of categories">
          <div class="card shadow-lg border-0 text-center p-3 h-100">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h4 class="card-title text-dark fw-semibold">{{ cat.name }}</h4>
                <p class="text-muted small">{{ cat.desc }}</p>
              </div>

              <div class="d-grid gap-2 mt-3">
                <button
                  class="btn btn-success btn-sm"
                  (click)="practiceQuiz(cat)"
                >
                  <i class="bi bi-play-circle me-1"></i> Practice Quiz
                </button>
                <button
                  class="btn btn-primary btn-sm"
                  (click)="createQuiz(cat)"
                >
                  <i class="bi bi-plus-circle me-1"></i> Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card:hover {
      transform: scale(1.03);
      transition: all 0.3s ease;
    }
  `]
})
export class Categories {
  constructor(private router: Router) { }

  // ✅ Only 4 categories as per your request
  categories = [
    { name: 'Angular', desc: 'Master components, directives, and RxJS in Angular.' },
    { name: 'DSA', desc: 'Sharpen your Data Structures & Algorithms skills.' },
    { name: 'Android', desc: 'Build mobile apps with Android and Kotlin.' },
    { name: 'DevOps', desc: 'Learn CI/CD, Docker, Kubernetes, and automation.' },
  ];

  // ✅ Navigate to Practice Quiz Page
  practiceQuiz(cat: any) {
    this.router.navigate(['/dashboard/practice'], {
      queryParams: { category: cat.name, timer: 5 },
    });
  }

  // ✅ Navigate to Create Quiz Page
  createQuiz(cat: any) {
    this.router.navigate(['/dashboard/create'], {
      queryParams: { category: cat.name },
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
