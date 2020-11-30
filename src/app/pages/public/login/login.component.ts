import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Helpers
import { SecurityHelper, RouteHelper } from '../../../helpers';

// Services
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    if ( this.securityService.authenticated ) {

      this.router.navigate(['/menu']);
    }

    this.formGroup = this.formBuilder.group({
      username: [ '', [ Validators.required, Validators.maxLength(20) ] ],
      password: [ '', [ Validators.required, Validators.maxLength(20) ] ]
    });
  }

  async signIn(event: { preventDefault: () => void; }) {

    event.preventDefault();
    if ( this.formGroup?.valid ) {

      const userName = this.formGroup.value.username;
      const password = this.formGroup.value.password;

      try {
        
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            }
        });

        const resp = await this.securityService.login( userName, password );
        SecurityHelper.checkSession(1000, 2000, resp.expireIn);

        Swal.close();
        this.router.navigate(['/menu']);

      } catch (err) {

        Swal.fire('Problemas', err.error, 'error');
        this.formGroup?.reset();
      }
    }
  }
}
