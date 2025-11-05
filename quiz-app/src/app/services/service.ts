import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'quiz_user';
    private readonly API_URL = 'http://localhost:5000/api'; // ✅ no trailing slash
    isLoggedInSignal = signal(!!localStorage.getItem(this.TOKEN_KEY));

    constructor(private http: HttpClient) { }

    /** ✅ Signup - Save user to backend DB */
    signup(user: any): Observable<any> {
        // ✅ Ensure exactly one slash: /api/signup
        const url = this.API_URL + '/signup';
        return this.http.post(url, user).pipe(
            tap((res: any) => {
                console.log('✅ User registered:', res);
            })
        );
    }

    /** ✅ Login - Validate against backend */
    login(email: string, password: string): Observable<any> {
        const url = this.API_URL + '/login';
        return this.http.post(url, { email, password }).pipe(
            tap((res: any) => {
                localStorage.setItem(this.TOKEN_KEY, JSON.stringify(res.user || res));
                localStorage.setItem('isLoggedIn', 'true');
                this.isLoggedInSignal.set(true);
            })
        );
    }

    /** ✅ Local login fallback (optional) */
    loginLocal(email: string, password: string): boolean {
        const storedUser = localStorage.getItem(this.TOKEN_KEY);
        if (!storedUser) return false;

        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedInSignal.set(true);
            return true;
        }

        return false;
    }

    /** ✅ Check login state */
    isLoggedIn(): boolean {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    /** ✅ Logout */
    logout(): void {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem(this.TOKEN_KEY);
        this.isLoggedInSignal.set(false);
    }
}
