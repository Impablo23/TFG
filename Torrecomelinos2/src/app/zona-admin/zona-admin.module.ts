import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonaAdminRoutingModule } from './zona-admin-routing.module';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { ZonasComponent } from './zonas/zonas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddZonaComponent } from './zonas/add-zona/add-zona.component';
import { EditZonaComponent } from './zonas/edit-zona/edit-zona.component';
import { DeleteZonaComponent } from './zonas/delete-zona/delete-zona.component';
import { AddCategoriaComponent } from './categorias/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './categorias/edit-categoria/edit-categoria.component';
import { DeleteCategoriaComponent } from './categorias/delete-categoria/delete-categoria.component';


@NgModule({
  declarations: [
    LayoutAdminComponent,
    ZonasComponent,
    CategoriasComponent,
    UsuariosComponent,
    AddZonaComponent,
    EditZonaComponent,
    DeleteZonaComponent,
    AddCategoriaComponent,
    EditCategoriaComponent,
    DeleteCategoriaComponent
  ],
  imports: [
    CommonModule,
    ZonaAdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ZonaAdminModule { }
