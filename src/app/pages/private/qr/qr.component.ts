import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { QrMenuService } from '../../../services/qr-menu.service';

// Helpers
import { RouteHelper } from 'src/app/helpers';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {

  fileQr: any;

  constructor(
    private qrMenuService: QrMenuService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if ( localStorage.getItem('token') == null ) {

      this.router.navigate([`${RouteHelper.getNavigateRoot()}/public/login`]);
    }

    this.qrMenuService.getQr()
      .subscribe( qr => {

        this.fileQr = qr;
      });
  }

}
