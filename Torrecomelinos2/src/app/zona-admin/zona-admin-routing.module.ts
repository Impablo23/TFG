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
import { AddUsuarioComponent } from './usuarios/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './usuarios/delete-usuario/delete-usuario.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { AddSugerenciaComponent } from './sugerencias/add-sugerencia/add-sugerencia.component';
import { DeleteSugerenciaComponent } from './sugerencias/delete-sugerencia/delete-sugerencia.component';
import { InfoSugerenciaComponent } from './sugerencias/info-sugerencia/info-sugerencia.component';

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
      { path: 'usuarios', component: UsuariosComponent,
        children: [
          { path: '', component: AddUsuarioComponent },
          { path: 'edit/:id', component: EditUsuarioComponent },
          { path: 'delete/:id', component: DeleteUsuarioComponent }
        ]
      },
      { path: 'sugerencias', component: SugerenciasComponent,
        children: [
          { path: '', component: InfoSugerenciaComponent},
          { path: 'add/:id', component: AddSugerenciaComponent },
          { path: 'delete/:id', component: DeleteSugerenciaComponent }
        ]
      },
      {path: '**', redirectTo: 'zonas'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaAdminRoutingModule { }
