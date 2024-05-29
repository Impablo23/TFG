import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [

  {
    // localhost:4200/auth/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'listado', component: ListPageComponent},
      {path: 'busqueda', component: SearchPageComponent},
      {path: 'detalles/:id', component: DetailsPageComponent},
      {path: 'editar/:id', component: EditPageComponent},
      {path: '**', redirectTo: 'listado'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecimientosRoutingModule { }
