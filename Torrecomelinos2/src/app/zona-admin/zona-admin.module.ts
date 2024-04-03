import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonaAdminRoutingModule } from './zona-admin-routing.module';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { ZonasComponent } from './zonas/zonas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LayoutAdminComponent,
    ZonasComponent,
    CategoriasComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ZonaAdminRoutingModule,
    MaterialModule
  ]
})
export class ZonaAdminModule { }
