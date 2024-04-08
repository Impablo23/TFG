import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { AdminGuard, AuthGuardService, HomeGuardService } from './guards/auth.guard';



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [AuthGuardService]
    canActivate: [HomeGuardService]
  },
  {
    path: 'establecimientos',
    loadChildren: () => import('./establecimientos/establecimientos.module').then(m => m.EstablecimientosModule),
    canActivate: [AuthGuardService]
    // canMatch: [canMatchGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./zona-admin/zona-admin.module').then(m => m.ZonaAdminModule),
    canActivate: [AdminGuard]
    // canMatch: [canMatchGuard]
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
