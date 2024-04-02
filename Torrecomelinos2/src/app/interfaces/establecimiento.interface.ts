export interface Establecimiento {
  id: string;
  id_categoria: number;
  id_zona: number;
  nombre: string; // Obligatorio
  descripcion: string;
  numResenas: number;
  direccion: string;
  telefono: string;
  foto: string;
  enlace: string;
}
