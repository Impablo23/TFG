import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';

const routes: Routes = [
  {
    // localhost:4200/auth/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'list', component: ListPageComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'details/:id', component: DetailsPageComponent},
      {path: '**', redirectTo: 'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecimientosRoutingModule { }
