import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Helpers
import { RouteHelper } from 'src/app/helpers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
    if ( localStorage.getItem('token') == null ) {

      this.router.navigate([`${RouteHelper.getNavigateRoot()}/public/login`]);
    }
  }

}
