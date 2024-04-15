from http.client import HTTPException
from typing import List
import mysql.connector
from pydantic import BaseModel
    
class Establecimiento(BaseModel):
  id: int
  id_categoria: int
  id_zona: int
  nombre: str
  descripcion: str
  numResenas: int
  direccion: str
  telefono: str
  foto: str
  enlace: str


# Conexión a la base de datos
conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="pablo11504",
    database="tfg"
)

# Método para obtener los usuarios de la base de datos y guardarlos en una lista de objetos Usuario
def obtener_establecimientos() -> List[Establecimiento]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM establecimientos"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    establecimientos = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        establecimiento = Establecimiento(**resultado)
        establecimientos.append(establecimiento)

    return establecimientos
