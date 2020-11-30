import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

// Helpers
import { SecurityHelper } from '../helpers/security.helper';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private baseUrl = environment.baseUrl;
  authenticated = false;

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean {

    const expired = SecurityHelper.expiredToken();
    if ( expired ) {
      localStorage.removeItem('token');
      this.authenticated = false;
    }
    
    return !expired;
  }

  async login( username: string, password: string ): Promise<any> {

    try {
      
      const resp = await this.http.post<any>(`${this.baseUrl}/security/login`, {username, password}).toPromise();
      localStorage.setItem('token', JSON.stringify(resp.metadata));
      this.authenticated = true;

      return resp.metadata;
    } catch (error) {

      this.authenticated = false;
      throw error.error;
    }
  }

  async logout() {

    localStorage.removeItem('token');
    this.authenticated = false;
  }
}
