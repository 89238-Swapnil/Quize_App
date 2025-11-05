import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],   // ✅ REQUIRED for HTTP
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = signal(0);
  selectedOption = signal<string | null>(null);
  loading = signal(true);

  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()] || null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  // ✅ Fetch from backend API
  loadQuestions(): void {
    this.http.get<any[]>('http://localhost:5000/api/questions').subscribe({
      next: (data) => {
        if (!Array.isArray(data)) {
          console.error('❌ Invalid data format from backend.');
          this.loading.set(false);
          return;
        }

        this.questions = data.map((q: any, index) => {
          let options: string[] = [];

          // handle various backend structures
          if (Array.isArray(q.options)) {
            options = q.options;
          } else {
            options = Object.keys(q)
              .filter(k => k.toLowerCase().startsWith('option'))
              .map(k => q[k])
              .filter((val: any) => val && typeof val === 'string');
          }

          return {
            id: index + 1,
            question: q.question || 'Untitled Question',
            options: this.shuffle([...options]),
            correct: q.correctAnswer ?? q.correct ?? null
          };
        });

        console.log(`✅ Loaded ${this.questions.length} questions`);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load questions from backend:', err);
        this.loading.set(false);
      }
    });
  }

  shuffle(array: any[]): any[] {
    return Array.isArray(array) ? [...array].sort(() => Math.random() - 0.5) : [];
  }

  selectOption(option: string): void {
    this.selectedOption.set(option);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex() < this.questions.length - 1) {
      this.currentQuestionIndex.update(i => i + 1);
      this.selectedOption.set(null);
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(i => i - 1);
      this.selectedOption.set(null);
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  }
}
