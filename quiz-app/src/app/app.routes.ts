import { Routes } from '@angular/router';
import { SignUp } from './components/signup/signup';
import { Login } from './components/login/login';
import { QuizComponent } from './components/quiz/quiz';
import { AuthGuard } from './guards/guard';
import { Home } from './components/home/home';
import { Dashboard } from './dashboard/dashboard';
import { Categories } from './dashboard/categories/categories';
import { Profile } from './dashboard/profile/profile';
import { CreateQuiz } from './components/create/create';
import { Practice } from './dashboard/practice/practice';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'signup', component: SignUp },
    { path: 'login', component: Login },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
    {
        path: 'dashboard',
        component: Dashboard,
        children: [
            { path: '', redirectTo: 'categories', pathMatch: 'full' },
            { path: 'categories', component: Categories },
            { path: 'profile', component: Profile },
            { path: 'quizzes', component: QuizComponent },
            { path: 'create', component: CreateQuiz },
            { path: 'practice', component: Practice },
        ]

    }
]; 
