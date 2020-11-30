import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QrMenuService } from 'src/app/services/qr-menu.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

// Helpers
import { FileHelper } from '../../helpers';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList | undefined;
  progressInfos: any[] = [];
  message = '';
  @ViewChild('inputFile') inputFile: ElementRef | undefined;

  fileInfos: {name: string, url: string, type: string }[] = [];

  constructor(
    private qrMenuService: QrMenuService
  ) { }

  ngOnInit(): void {

    this.qrMenuService.getFiles()
      .subscribe((files: {name: string, url: string, type: string }[]) => {

        this.fileInfos = files;
      });
  }

  checkCountPdfUpload(files: FileList): boolean {

    let pdf = 0;
    for (let i = 0; i < files.length; i++) {
      
      if ( FileHelper.isPdf(files[i])) {
        pdf++;
      }
    }

    return pdf <= environment.files.pdf;
  }

  checkCountImageUpload(files: FileList): boolean {

    let image = 0;
    for (let i = 0; i < files.length; i++) {
      
      if ( !FileHelper.isPdf(files[i])) {
        image++;
      }
    }

    return image <= environment.files.image;
  }

  selectFiles(event: any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(event: any) {
    
    this.message = '';
    if ( this.selectedFiles !== undefined && this.selectedFiles.length > 0 ) {

      // Valido cantidad permitida de pdfs
      if ( !this.checkCountPdfUpload(this.selectedFiles)) {

        Swal.fire(
          'Problemas al subir el archivo!!!', 
          `Solamente puede cargar ${ environment.files.pdf } pdfs!`, 
          'error'
        );
        this.clearInputFile();
  
        return;
      }

      // Valido cantidad permitida de imágenes
      if ( !this.checkCountImageUpload(this.selectedFiles)) {

        Swal.fire(
          'Problemas al subir el archivo!!!', 
          `Solamente puede cargar ${ environment.files.image } imágenes!`,
          'error'
        );
        this.clearInputFile();
  
        return;
      }

      if (!FileHelper.isFileAvailable(this.selectedFiles)) {

        Swal.fire('Archivo inválido', 'Solamente se permiten archivos de imagen o pdf!!!', 'error');
        this.clearInputFile();
        return;
      }

      this.qrMenuService.clearFiles()
        .subscribe(() => {

          if ( this.selectedFiles !== undefined ) {

            for (let i = 0; i < this.selectedFiles.length; i++) {
              this.upload(i, this.selectedFiles[i]);
            }
          }
        },
        error => {

          Swal.fire('Problemas', 'No se pudo preparar la subida correctamente!!', 'error');
          this.clearInputFile();
        });
    }
  }

  upload(idx: any, file: any) {

    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        }
    });

    this.qrMenuService.upload(file).subscribe(
      (event: any) => {
        
        if (event.type === HttpEventType.UploadProgress) {
          
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) {

          this.qrMenuService.getFiles()
            .subscribe((files: {name: string, url: string, type: string }[]) => {

              this.fileInfos = files;
              this.clearInputFile();
              Swal.fire('Subida correctamente!!!', 'La carga se ha realizado con éxito', 'success');
            });            
        }

      },
      err => {

        this.progressInfos[idx].value = 0;
        this.message = 'No se pudo subir el archivo' + file.name;
        Swal.fire('Problemas al subir el archivo!!!', 'No se pudo subir el archivo: ' + file.name + '. \nAsegúrese de tener conexión a Internet', 'error');
        this.clearInputFile();
      });
  }

  private clearInputFile() {
    
    if ( this.inputFile ) {

      this.inputFile.nativeElement.value = '';
    }
  }
}
