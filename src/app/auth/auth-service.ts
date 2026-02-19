import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/v1/auth/authenticate';

  http = inject(HttpClient);

    login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}`, data).pipe(
      tap((res) => {
        localStorage.setItem('jwt', res.jwt);
      })
    );
  }

  logout() {
  localStorage.removeItem('jwt');
  sessionStorage.removeItem('jwt');
}

getToken(): string | null {
  const token = localStorage.getItem('jwt');
  return token ? token : null;
}


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
