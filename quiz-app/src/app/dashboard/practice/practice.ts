import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-secondary me-3" (click)="goBack()">← Back</button>
          <h2 class="text-primary mb-0">Practice Quiz - {{ category }}</h2>
        </div>
        <h4 class="text-danger">Time Left: {{ minutes }}:{{ seconds | number: '2.0' }}</h4>
      </div>

      <div *ngIf="questions.length > 0; else loading">
        <div *ngFor="let q of questions; let i = index" class="card mb-3 p-3 shadow-sm">
          <h5>{{ i + 1 }}. {{ q.question }}</h5>

          <div *ngFor="let option of q.options" class="form-check mt-2">
            <input
              type="radio"
              [name]="'question' + i"
              class="form-check-input"
              [value]="option"
              (change)="selectAnswer(i, option)"
            />
            <label class="form-check-label">{{ option }}</label>
          </div>
        </div>

        <div class="d-grid mt-4">
          <button class="btn btn-success btn-lg" (click)="submitQuiz()">Submit Quiz</button>
        </div>
      </div>

      <ng-template #loading>
        <p>Loading questions...</p>
      </ng-template>
    </div>
  `
})
export class Practice implements OnInit {
  questions: any[] = [];
  category = '';
  selectedAnswers: any = {};
  minutes = 0;
  seconds = 0;
  timer = 5;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.category = params['category'] || 'Angular';
    this.timer = +params['timer'] || 5;

    this.startTimer();
    this.loadQuestions();
  }

 loadQuestions() {
  // Example: category = "Angular1"
  const normalizedCategory = this.category.trim(); // keep as is (don't remove number)
  const filePath = `assets/${normalizedCategory.toLowerCase()}.json`; // ✅ correct path

  this.http.get<any[]>(filePath).subscribe({
    next: (data) => {
      this.questions = data;
      if (this.questions.length === 0) {
        console.warn(`⚠️ No questions found in ${filePath}`);
      } else {
        console.log(`✅ Loaded ${this.questions.length} questions from ${filePath}`);
      }
    },
    error: (err) => {
      console.error(`❌ Error loading ${filePath}:`, err);
      alert(`Questions file not found: ${filePath}`);
    }
  });
}


  startTimer() {
    let totalSeconds = this.timer * 60;
    this.interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(this.interval);
        this.submitQuiz();
      } else {
        totalSeconds--;
        this.minutes = Math.floor(totalSeconds / 60);
        this.seconds = totalSeconds % 60;
      }
    }, 1000);
  }

  selectAnswer(index: number, option: string) {
    this.selectedAnswers[index] = option;
  }

  submitQuiz() {
    clearInterval(this.interval);
    let score = 0;
    this.questions.forEach((q, i) => {
      if (this.selectedAnswers[i] === q.answer) score++;
    });

    alert(`✅ Quiz Completed! You scored ${score} / ${this.questions.length}`);
  }

  goBack() {
    this.router.navigate(['/dashboard/categories']);
  }
}
