import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data?.['roles'] as string[] | undefined;

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (allowedRoles && !this.auth.hasRole(...allowedRoles)) {
      // User is authenticated but not authorized for this route
      this.router.navigate(['/medicines']);
      return false;
    }

    return true;
  }
}
