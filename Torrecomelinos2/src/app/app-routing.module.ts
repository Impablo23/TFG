import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'establecimientos',
    loadChildren: () => import('./establecimientos/establecimientos.module').then(m => m.EstablecimientosModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./zona-admin/zona-admin.module').then(m => m.ZonaAdminModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
