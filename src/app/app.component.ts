import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import Swal from 'sweetalert2';
import { environment } from '../environments/environment';

// Services
import { SecurityService } from './services/security.service';

// Helpers
import { SecurityHelper, RouteHelper } from './helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showBloqueo = false;

  constructor(
    public securityService: SecurityService,
    private router: Router
  ) {
    setTheme('bs4');
  }

  ngOnInit(): void {

    this.router.events.subscribe((event: any) => {
      if (event.navigationTrigger === 'popstate') {

        return;
      }
    });

    // Si viene del cliente
    if (window.location.href.indexOf('public/client') >= 0) {

      if (!this.isPublicKeyAvailable()) {

        Swal.fire({
          title: 'Bloqueado',
          text: 'Acceso restringido!!!',
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'error'
        }
        );

        this.showBloqueo = true;
      }
      else {

        this.router.navigate([`public/client/${environment.publicKey}`]);
      }

    }
    else {

      if (!SecurityHelper.expiredToken()) {

        const token = SecurityHelper.getToken();
        SecurityHelper.checkSession(1000, 2000, token.expireIn);
        this.router.navigate([`${RouteHelper.getNavigateRoot()}${window.location.href.split('/').pop()}`]);
      }
    }
  }

  isPublicKeyAvailable(): boolean {

    const publicKey = window.location.href.split('public/client/').pop();

    return environment.publicKey === publicKey;
  }

  showHeader(): boolean {

    const path = window.location.href;
    return path.indexOf('public') === -1;
  }
}
