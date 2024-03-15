import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAppComponent } from './layout-app/layout-app.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAppComponent
  },
  {
    path: 'establecimientos',
    loadChildren: () => import('./establecimientos/establecimientos.module').then(m => m.EstablecimientosModule),

  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
