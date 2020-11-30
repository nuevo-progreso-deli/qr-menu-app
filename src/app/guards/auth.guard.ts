import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { SecurityService } from '../services/security.service';

// Helpers
import { SecurityHelper, RouteHelper } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if ( !this.securityService.authenticated && SecurityHelper.expiredToken() ) {
        this.router.navigate(['public/login']);
      }
      else {
        this.securityService.authenticated = true;
      }

      return this.securityService.authenticated;
    }
  
}
