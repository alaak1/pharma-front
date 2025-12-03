import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://pharma-backend-two.vercel.app';

  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/api/login`, { email, password });
  }

  refresh(refreshToken: string) {
    return this.http.post<any>(`${this.apiUrl}/api/refresh`, { refreshToken });
  }

  saveSession(token: string, refresh: string, user: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user") || "null");
  }

  hasRole(...roles: string[]): boolean {
    const user = this.getUser();
    if (!user?.role) return false;
    return roles.includes(user.role);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    return this.helper.isTokenExpired(token);
  }

  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }
}
