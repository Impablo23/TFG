import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthApiService } from '../../services/authApi.service';

import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {

  private usuariosSubscription!: Subscription;

  public listadoUsuarios: UsuarioApi[] = [];

  public token = 'token';

  constructor(
    public router: Router,
    private authApi: AuthApiService
  ){}

  async ngOnInit(){
    this.token = this.authApi.getTokenUserConectado();

    await this.obtenerUsuarios();

  }

  ngOnDestroy() {
    // Desuscribe la suscripción al salir del componente para evitar posibles fugas de memoria
    this.usuariosSubscription.unsubscribe();
  }

  async obtenerUsuarios() {
    try {
      // Suscríbete al observable para obtener las actualizaciones del listado de categorías
      this.usuariosSubscription = this.authApi.usuarios$.subscribe(usuarios => {
        this.listadoUsuarios = usuarios;
      });

      // Obten las categorías al iniciar el componente
      this.authApi.getUsersApi(this.token).subscribe();
    } catch (error) {
      console.error('Error al obtener zonas:', error);
      // Manejar el error según sea necesario
    }
  }


  public goToEditZona(id: string) {
    this.router.navigate(['admin/usuarios/edit', id]);
  }

  public goToDeleteZona(id: string) {
    this.router.navigate(['admin/usuarios/delete', id]);
  }

}
