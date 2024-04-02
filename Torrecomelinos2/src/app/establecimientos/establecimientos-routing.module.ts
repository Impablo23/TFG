import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';

const routes: Routes = [
  {
    // localhost:4200/auth/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'list', component: ListPageComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'add', component: AddPageComponent},
      {path: 'favourite-list', component: FavouritePageComponent},
      {path: 'details/:id', component: DetailsPageComponent},
      {path: 'delete/:id', component: DeletePageComponent},
      {path: 'edit/:id', component: EditPageComponent},
      {path: '**', redirectTo: 'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecimientosRoutingModule { }
