import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablecimientosRoutingModule } from './establecimientos-routing.module';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { DetailsPageComponent } from './details-page/details-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    DetailsPageComponent
  ],
  imports: [
    CommonModule,
    EstablecimientosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EstablecimientosModule { }
