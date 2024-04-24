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

  public token: string = '';

  constructor(private authApi: AuthApiService) {}

  async ngOnInit(): Promise<void> {

    // Obtener token API
    const response = await this.authApi.getToken(this.authApi.getEmailUserConectado(), this.authApi.getPassUserConectado()).toPromise();
    this.token = response.access_token;

    this.authApi.getRegistroApi().subscribe(
      registros => {
        this.listadoRegistros = registros;
        this.cargarNombresUsuarios(); // Llamar a la función para cargar los nombres de usuario
      }
    );
  }

  cargarNombresUsuarios(): void {
    for (const registro of this.listadoRegistros) {
      this.obtenerNombreUser(registro.id_usuario).subscribe(
        nombre => {
          this.listadoNombresUsuarios[registro.id_usuario] = nombre;
           // Almacenar el nombre en el objeto usando el ID como clave
        }
      );
    }
  }

  obtenerNombreUser(id: number): Observable<string> {
    return this.authApi.getUsersApiById(id,this.token).pipe(
      map(usuarios => usuarios[0].email)
    );
  }
}
