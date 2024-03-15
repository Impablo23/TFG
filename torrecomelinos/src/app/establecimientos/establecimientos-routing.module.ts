import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [

  {
    // localhost:4200/auth/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'listado', component: ListPageComponent},
      // {path: 'register', component: RegisterComponent},
      // {path: '**', redirectTo: 'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablecimientosRoutingModule { }
