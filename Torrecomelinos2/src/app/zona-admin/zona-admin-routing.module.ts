import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { ZonasComponent } from './zonas/zonas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    // localhost:4200/admin/
    path: '',
    component: LayoutAdminComponent,
    children: [
      {path: 'zonas', component: ZonasComponent},
      {path: 'categorias', component: CategoriasComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: '**', redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaAdminRoutingModule { }
