import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablecimientosRoutingModule } from './establecimientos-routing.module';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { DetailsPageComponent } from './details-page/details-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DeletePageComponent } from './delete-page/delete-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    DetailsPageComponent,
    EditPageComponent,
    AddPageComponent,
    DeletePageComponent,
    FavouritePageComponent
  ],
  imports: [
    CommonModule,
    EstablecimientosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EstablecimientosModule { }
