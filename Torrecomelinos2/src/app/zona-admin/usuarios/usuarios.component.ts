import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthJsonService } from 'src/app/services/authJson.service';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(public router: Router,private authJsonService: AuthJsonService){}

  ngOnInit(){
    this.listarZonas();
  }
  public listadoUsuarios: Usuario[] = [];

  public listarZonas(){
    this.authJsonService.getUsers().subscribe(
      usuarios => {
        this.listadoUsuarios = usuarios;
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
