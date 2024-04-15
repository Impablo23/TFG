import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { AuthApiService } from '../../services/authApi.service';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(public router: Router,private authJsonService: AuthJsonService,private authApi: AuthApiService){}

  ngOnInit(){
    this.listarUsuarios();
  }
  public listadoUsuarios: UsuarioApi[] = [];

  public listarUsuarios(){
    this.authApi.getUsersApi().subscribe(
      usuarios => {
        this.listadoUsuarios = usuarios
        console.log(this.listadoUsuarios);
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
