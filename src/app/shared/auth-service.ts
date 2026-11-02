import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Service()
export class AuthService {
    http = inject(HttpClient)
    router = inject(Router)

    private isAuthentiacted = signal<boolean>(!!localStorage.getItem('token'));

    readonlyIsAuthenticated = this.isAuthentiacted.asReadonly()
    
    login(user: any) {
        const url = 'http://localhost:8000/api/login'
        return this.http.post(url, user)
    }

    loginSuccess(){
        this.isAuthentiacted.set(true);
    }

    logout(){
        this.isAuthentiacted.set(false);
        localStorage.removeItem('token');
        this.router.navigate(['login'])
    }
}
