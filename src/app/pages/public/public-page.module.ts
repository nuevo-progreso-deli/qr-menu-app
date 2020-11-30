import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';

// Routes
import { PublicRoutingModule } from './public-routing.module';

// PdfViewer
import { PdfViewerModule } from 'ng2-pdf-viewer';

// Pipes
import { CutExtensionPipe } from '../../pipes/cut-extension.pipe';

// Pages
import { LoginComponent } from '../public/login/login.component';
import { MenuClientComponent } from '../public/menu-client/menu-client.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuClientComponent,
    CutExtensionPipe
  ],
  exports: [
    LoginComponent,
    MenuClientComponent,
    CutExtensionPipe
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
  ]
})
export class PublicPageModule { }
