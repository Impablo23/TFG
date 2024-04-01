import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    // localhost:4200/auth/
    path: '',
    component: LayoutAuthComponent,
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: '**', redirectTo: 'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
