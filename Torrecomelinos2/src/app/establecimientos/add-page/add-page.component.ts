import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Establecimiento } from 'src/app/interfaces/establecimiento.interface';
import { Zona } from 'src/app/interfaces/zona.interface';
import { EstablecimientosJsonService } from 'src/app/services/establecimientos.service';
import { Sugerencia } from '../../interfaces/sugerencia.interface';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {

  // public establecimientoDetalles?: Establecimiento;
  public listadoZonas: Zona[] = [];
  public listadoCategorias: Categoria[] = [];

  public numEstablecimientos: number = 0;

  public idEstablecimientoSugerido: string = '';


  public nombre: string = '';
  public descripcion: string = '';
  public direccion: string = '';
  public telefono: string = '';
  public foto: string = '';
  public enlace: string = '';
  public numResenas: number = 0;
  public id_zona: number = 0;
  public id_categoria: number = 0;


  constructor(
    private establecimientosJsonService: EstablecimientosJsonService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ){

  }


  ngOnInit(): void {

      this.route.queryParams.subscribe(params => {
        this.idEstablecimientoSugerido = params['sugerenciaId'];
        // Utiliza el ID de la sugerencia para cargar los datos de la sugerencia, o realiza cualquier otra lógica necesaria
      });

      console.log("id sugerencia: "+this.idEstablecimientoSugerido);

      if (this.idEstablecimientoSugerido !== undefined) {
        this.establecimientosJsonService.getSugerenciaById(this.idEstablecimientoSugerido).subscribe(
          sugerencias => {
            this.nombre = sugerencias[0].nombre;
            this.enlace = sugerencias[0].enlace;
          }
        );
      }

      this.establecimientosJsonService.getZonas().subscribe(zonas => {
        this.listadoZonas = zonas;
      });

      this.establecimientosJsonService.getCategorias().subscribe(categoria => {
        this.listadoCategorias = categoria;
      });

    // this.idRol = localStorage.getItem('idRol')!;

  }

  public goToList(){
    this.router.navigate([`/establecimientos/list`]);
  }

  obtenerNombreZona(idZona: string): string {
    let nombre:string = '';
    for (const zona of this.listadoZonas) {
      // console.log(zona.id);
      // console.log(zona.nombre);
      if (zona.id == idZona) {
        nombre = zona.nombre
      }
    }
    return nombre;
  }

  obtenerNombreCategoria(idCategoria: string): string {
    let nombre:string = '';
    for (const categoria of this.listadoCategorias) {
      // console.log(zona.id);
      // console.log(zona.nombre);
      if (categoria.id == idCategoria) {
        nombre = categoria.nombre
      }
    }
    return nombre;
  }

  evitarErrorEnFoto(foto: string): string {
    if (foto.length === 0) {
      return 'assets/no_foto.png';
    }else{
      return foto;
    }
  }


  public addEstablecimiento(): void {
    // Obtener la lista de establecimientos para determinar el máximo ID actual
    this.establecimientosJsonService.getEstablecimientos().subscribe(establecimientos => {
        let maxId = 0;

        // Encontrar el máximo ID actual entre los establecimientos existentes
        establecimientos.forEach(establecimiento => {
            const idNum = parseInt(establecimiento.id);
            if (idNum > maxId) {
                maxId = idNum;
            }
        });

        // Generar el nuevo ID sumando 1 al máximo ID encontrado
        const nuevoId = (maxId + 1).toString();

        // Crear el objeto de establecimiento con el nuevo ID y los demás datos
        const establecimientoEditado: Establecimiento = {
            id: nuevoId,
            id_zona: parseInt(this.id_zona.toString()),
            id_categoria: parseInt(this.id_categoria.toString()),
            nombre: this.nombre,
            descripcion: this.descripcion,
            numResenas: this.numResenas,
            direccion: this.direccion,
            telefono: this.telefono,
            foto: this.foto,
            enlace: this.enlace,
        };

        // Verificar que se haya proporcionado un nombre para el establecimiento
        if (this.nombre.length === 0) {
            this.snackbar.open("Es obligatorio rellenar el nombre del establecimiento", "Cerrar", { duration: 2000, panelClass: ['background'] });
            return;
        }

        // Agregar el nuevo establecimiento utilizando el servicio correspondiente
        this.establecimientosJsonService.addEstablecimiento(establecimientoEditado).subscribe(
            (response) => {
                this.snackbar.open("Establecimiento añadido correctamente", "Cerrar", { duration: 2000, panelClass: ['background'] });

                // Eliminar la sugerencia asociada al establecimiento (si existe)
                if (this.idEstablecimientoSugerido !== undefined) {
                    this.establecimientosJsonService.deleteSugerencia(this.idEstablecimientoSugerido).subscribe(
                        (response) => { },
                        (error) => { }
                    );
                }

                // Navegar a la lista de establecimientos después de completar la operación
                this.router.navigate(['/establecimientos/list']);
            },
            (error) => {
                this.snackbar.open("Ha ocurrido un error al añadir el establecimiento", "Cerrar", { duration: 2000, panelClass: ['background'] });
            }
        );
    });
}



}
