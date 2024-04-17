import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthApiService } from '../../services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(
    public router: Router,
    private authApi: AuthApiService
  ){}

  ngOnInit(){
    this.listarUsuarios();
  }
  public listadoUsuarios: UsuarioApi[] = [];

  public listarUsuarios(){
    this.authApi.getUsersApi().subscribe(
      usuarios => {
        this.listadoUsuarios = usuarios
      }
    );
  }

  public goToEditZona(id: string) {
    this.router.navigate(['admin/usuarios/edit', id]);
  }

  public goToDeleteZona(id: string) {
    this.router.navigate(['admin/usuarios/delete', id]);
  }

}
