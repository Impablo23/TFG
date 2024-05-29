import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegistroApi } from 'src/app/interfaces/registroApi.interface';
import { UsuarioApi } from 'src/app/interfaces/usuarioApi.interface';
import { AuthApiService } from 'src/app/services/authApi.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public listadoRegistros: RegistroApi[] = [];
  public listadoNombresUsuarios: { [id: number]: string } = {}; // Objeto para almacenar los nombres de usuario por ID

  public tokenApi: string = '';

  constructor(private authApi: AuthApiService) {}

  async ngOnInit(): Promise<void> {

    this.tokenApi = sessionStorage.getItem('tokenApi')!;

    const response = await this.authApi.getRegistroApi(this.tokenApi).toPromise();
    this.listadoRegistros = response!;

    this.cargarNombresUsuarios();
  }

  async cargarNombresUsuarios(): Promise<void> {
    try {
      for (const registro of this.listadoRegistros) {
        const nombre = await this.obtenerNombreUser(registro.id_usuario).toPromise();
        this.listadoNombresUsuarios[registro.id_usuario] = nombre!;
      }
    } catch (error) {
      console.error('Error al cargar nombres de usuarios:', error);
    }
  }

  obtenerNombreUser(id: number): Observable<string> {
    return this.authApi.getUsersApiById(id, this.tokenApi).pipe(
      map(usuarios => usuarios[0].email)
    );
  }

}
