import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Herlpers
import { FileHelper } from 'src/app/helpers/file.helper';

// Services
import { QrMenuService } from 'src/app/services/qr-menu.service';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.scss']
})
export class MenuClientComponent implements OnInit {

  filesPdf: any[] = [];
  filesImg: any[] = [];

  constructor(
    private qrMenuService: QrMenuService
  ) { }

  ngOnInit(): void {

    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    this.qrMenuService.getFiles()
      .subscribe((files: any[]) => {

        this.filesPdf = files.filter(f => FileHelper.isPdf(f));
        this.filesImg = files.filter(f => !FileHelper.isPdf(f));

        if ( this.filesPdf.length === 0 &&  this.filesImg.length === 0) {

          Swal.fire({
            title: 'No hay Carta',
            text: 'Por favor, pida que carguen la misma y luego vuelva a escanear el QR',
            allowOutsideClick: false,
            showConfirmButton: false,
            icon: 'question'
          });
        }
        else {
          
          Swal.close();
        }        

      }, error => {

        Swal.fire('Problemas', error.error, 'error');
      });
  }

}
