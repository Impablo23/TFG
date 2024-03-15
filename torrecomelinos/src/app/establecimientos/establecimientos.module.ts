import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablecimientosRoutingModule } from './establecimientos-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    EstablecimientosRoutingModule,
    MaterialModule
  ]
})
export class EstablecimientosModule { }
