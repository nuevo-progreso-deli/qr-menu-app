import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  logout() {

    this.securityService.logout();
    this.router.navigate(['public/login']);
  }
}
