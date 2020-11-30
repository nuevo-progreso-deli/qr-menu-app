import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { PrivateRountingModule } from './private-rounting.module';

// Components
import { UploadFilesComponent } from '../../components/upload-files/upload-files.component';

// Pages
import { MenuComponent } from '../private/menu/menu.component';
import { QrComponent } from '../private/qr/qr.component';

@NgModule({
  declarations: [
    MenuComponent,
    QrComponent,
    UploadFilesComponent,
  ],
  exports: [
    MenuComponent,
    QrComponent,
  ],
  imports: [
    CommonModule,
    PrivateRountingModule
  ]
})
export class PrivatePageModule { }
