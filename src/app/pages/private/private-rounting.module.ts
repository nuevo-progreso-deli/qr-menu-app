import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { MenuComponent } from '../private/menu/menu.component';
import { QrComponent } from '../private/qr/qr.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'qr', component: QrComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRountingModule { }
