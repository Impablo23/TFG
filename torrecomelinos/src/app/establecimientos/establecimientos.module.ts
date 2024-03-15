import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablecimientosRoutingModule } from './establecimientos-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    DetailsPageComponent,
    SearchPageComponent,
    DialogComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    EstablecimientosRoutingModule,
    MaterialModule
  ]
})
export class EstablecimientosModule { }
