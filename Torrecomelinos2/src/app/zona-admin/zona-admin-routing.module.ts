import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { ZonasComponent } from './zonas/zonas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditZonaComponent } from './zonas/edit-zona/edit-zona.component';
import { DeleteZonaComponent } from './zonas/delete-zona/delete-zona.component';
import { AddZonaComponent } from './zonas/add-zona/add-zona.component';
import { AddCategoriaComponent } from './categorias/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './categorias/edit-categoria/edit-categoria.component';
import { DeleteCategoriaComponent } from './categorias/delete-categoria/delete-categoria.component';

const routes: Routes = [
  {
    // localhost:4200/admin/
    path: '',
    component: LayoutAdminComponent,
    children: [
      { path: 'zonas', component: ZonasComponent,
        children: [
          { path: '', component: AddZonaComponent },
          { path: 'edit/:id', component: EditZonaComponent },
          { path: 'delete/:id', component: DeleteZonaComponent }
        ]
      },
      { path: 'categorias', component: CategoriasComponent,
        children: [
          { path: '', component: AddCategoriaComponent },
          { path: 'edit/:id', component: EditCategoriaComponent },
          { path: 'delete/:id', component: DeleteCategoriaComponent }
        ]
      },
      {path: 'usuarios', component: UsuariosComponent},
      {path: '**', redirectTo: 'zonas'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaAdminRoutingModule { }
