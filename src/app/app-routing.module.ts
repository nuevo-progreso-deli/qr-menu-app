import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

const routes: Routes = [
  
  { 
    path: '', 
    loadChildren: () => import('./pages/private/private-page.module').then(m => m.PrivatePageModule),
  },
  { path: 'public', loadChildren: () => import('./pages/public/public-page.module').then(m => m.PublicPageModule) },
  { path: '**', redirectTo: 'menu' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ]
})
export class AppRoutingModule { }
