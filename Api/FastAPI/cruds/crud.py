from http.client import HTTPException
from typing import List
import mysql.connector
from pydantic import BaseModel
from fastapi import status
import hashlib

class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

class Usuario(BaseModel):
    id: int
    email: str
    passwd: str
    nombreCompleto: str
    idRol: int
    token: str
    verificado: int
    
class Rol(BaseModel):
    id: int
    rol: str
    
class Favorito(BaseModel):
    id: int
    id_usuario: int
    id_establecimiento: int
    
class Registro(BaseModel):
    id: int
    id_usuario: int
    estado: str
    hora: str
    
class Sugerencia(BaseModel):
    id: int
    id_usuario: int
    nombre: str
    enlace: str
    
class Zona(BaseModel):
    id: int
    nombre: str
    
class Categoria(BaseModel):
    id: int
    nombre: str
    
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
    host="143.47.55.174",
    user="pablo",
    password="pablo",
    database="torrecomelinos"
)

#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------OPERACIONES CRUD---------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# Función para ejecutar la consulta SQL
def ejecutar_consulta(consulta, datos):
    try:
        # Crear cursor
        cursor = conexion.cursor()

        # Ejecutar la consulta con los datos proporcionados
        cursor.execute(consulta, datos)

        # Confirmar la transacción
        conexion.commit()
        
        # Cerrar cursor
        cursor.close()
        
        return True  # La consulta se ejecutó correctamente
    except mysql.connector.Error as error:
        # Si ocurre un error, devolver False
        return False
    
    
def encriptar_md5(texto):
    # Convertir el string a bytes
    texto_bytes = texto.encode('utf-8')
    
    # Crear un objeto hash MD5
    hash_md5 = hashlib.md5()
    
    # Actualizar el hash con los bytes del texto
    hash_md5.update(texto_bytes)
    
    # Obtener la representación hexadecimal del hash
    hash_encriptado = hash_md5.hexdigest()
    
    return hash_encriptado

#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------ROLES--------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

def obtener_roles() -> List[Rol]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM roles"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    roles = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        rol = Rol(**resultado)
        roles.append(rol)

    return roles


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------USUARIOS-----------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# Método para autenticar y obtener un usuario
def get_user_token(token: str):
    cursor = conexion.cursor(dictionary=True)
    query = "SELECT * FROM usuarios WHERE token = %s and idRol = 1"
    cursor.execute(query, (token,))
    resultado = cursor.fetchone()
    cursor.close()
    # conexion.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        usuario = Usuario(**resultado)
        return [usuario]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []

    return Usuario(**user_data)

# Método para obtener los usuarios de la base de datos y guardarlos en una lista de objetos Usuario
def obtener_usuarios() -> List[Usuario]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM usuarios"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()

    # Lista para almacenar los usuarios
    usuarios = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        usuario = Usuario(**resultado)
        usuarios.append(usuario)

    # conexion.close()
    return usuarios



def obtener_usuario_por_id(id: int) -> List[Usuario]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el ID especificado
    consulta = "SELECT * FROM usuarios WHERE id = %s"

    # Ejecutar la consulta con el ID como parámetro
    cursor.execute(consulta, (id,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        usuario = Usuario(**resultado)
        return [usuario]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
    
def obtenerUserByEmailAndPass(email: str, passwd: str) -> List[Usuario]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email y la contraseña especificados
    consulta = "SELECT * FROM usuarios WHERE email = %s AND passwd = %s and verificado = 1"

    # Ejecutar la consulta con el email y la contraseña como parámetros
    cursor.execute(consulta, (email, passwd))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        usuario = Usuario(**resultado)
        return [usuario]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
    
def obtenerUserByEmail(email: str) -> List[Usuario]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email especificado
    consulta = "SELECT * FROM usuarios WHERE email = %s"

    # Ejecutar la consulta con el email como parámetro
    cursor.execute(consulta, (email,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor
    cursor.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        usuario = Usuario(**resultado)
        return [usuario]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []

    

async def addUser(usuario: Usuario):
    try:
        # Crear cursor
        cursor = conexion.cursor()

        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token) VALUES (%s, %s, %s, %s, %s)"

        # Ejecutar la consulta con los datos del nuevo usuario
        cursor.execute(consulta, (usuario.email, usuario.passwd, usuario.nombreCompleto, usuario.idRol, usuario.token))

        # Confirmar la transacción
        conexion.commit()
        
        # Cerrar cursor
        cursor.close()
        
        return usuario

    except mysql.connector.Error as error:
        # Si ocurre un error al agregar el usuario, lanzar una excepción
        raise HTTPException(status_code=500, detail=f"Error al agregar el usuario: {error}")


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------REGISTROS----------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

def obtener_registros() -> List[Registro]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM registro ORDER BY id DESC LIMIT 10"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    registros = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        registro = Registro(**resultado)
        registros.append(registro)

    return registros
    
    
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------ESTABLECIMIENTOS---------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

    
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

def obtener_establecimiento_por_id(id: int) -> List[Establecimiento]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el ID especificado
    consulta = "SELECT * FROM establecimientos WHERE id = %s"

    # Ejecutar la consulta con el ID como parámetro
    cursor.execute(consulta, (id,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        establecimiento = Establecimiento(**resultado)
        return [establecimiento]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
    
def obtener_establecimiento_por_nombre(nombre: str) -> List[Establecimiento]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el ID especificado
    consulta = "SELECT * FROM establecimientos WHERE nombre = %s"

    # Ejecutar la consulta con el ID como parámetro
    cursor.execute(consulta, (nombre,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        establecimiento = Establecimiento(**resultado)
        return [establecimiento]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------ZONAS--------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

def obtener_zonas() -> List[Zona]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM zonas ORDER BY id ASC"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    zonas = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        zona = Zona(**resultado)
        zonas.append(zona)

    return zonas

def obtenerZonaByName(nombre: str) -> List[Zona]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email especificado
    consulta = "SELECT * FROM zonas WHERE nombre = %s"

    # Ejecutar la consulta con el email como parámetro
    cursor.execute(consulta, (nombre,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor
    cursor.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        zona = Zona(**resultado)
        return [zona]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
def obtenerZonaById(id: int) -> List[Zona]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email especificado
    consulta = "SELECT * FROM zonas WHERE id = %s"

    # Ejecutar la consulta con el email como parámetro
    cursor.execute(consulta, (id,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor
    cursor.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        zona = Zona(**resultado)
        return [zona]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------CATEGORIAS---------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

def obtener_categorias() -> List[Categoria]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM categorias ORDER BY id ASC"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    categorias = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        categoria = Categoria(**resultado)
        categorias.append(categoria)

    return categorias

def obtenerCategoriaByName(nombre: str) -> List[Categoria]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email especificado
    consulta = "SELECT * FROM categorias WHERE nombre = %s"

    # Ejecutar la consulta con el email como parámetro
    cursor.execute(consulta, (nombre,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor
    cursor.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        categoria = Categoria(**resultado)
        return [categoria]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
def obtenerCategoriaById(id: int) -> List[Categoria]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email especificado
    consulta = "SELECT * FROM categorias WHERE id = %s"

    # Ejecutar la consulta con el email como parámetro
    cursor.execute(consulta, (id,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor
    cursor.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        categoria = Categoria(**resultado)
        return [categoria]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
  
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------SUGERENCIAS--------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------  
    
def obtener_sugerencias() -> List[Sugerencia]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM sugerencias"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    sugerencias = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        sugerencia = Sugerencia(**resultado)
        sugerencias.append(sugerencia)

    return sugerencias


def obtenerSugerenciaById(id: int) -> List[Sugerencia]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el email especificado
    consulta = "SELECT * FROM sugerencias WHERE id = %s"

    # Ejecutar la consulta con el email como parámetro
    cursor.execute(consulta, (id,))

    # Obtener el resultado
    resultado = cursor.fetchone()

    # Cerrar cursor
    cursor.close()

    # Verificar si se encontró el usuario
    if resultado:
        # Crear un objeto Usuario con el resultado y devolverlo como lista
        sugerencia = Sugerencia(**resultado)
        return [sugerencia]
    else:
        # Si no se encuentra el usuario, devolver una lista vacía
        return []
    
    
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------FAVORITOS----------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------


def obtener_favoritos() -> List[Favorito]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener los usuarios
    consulta = "SELECT * FROM favoritos"
    
    # Ejecutar la consulta
    cursor.execute(consulta)
    
    # Obtener resultados
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    favoritos = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        favorito = Favorito(**resultado)
        favoritos.append(favorito)

    return favoritos


def obtenerFavoritosByIdUser(id: int) -> List[Favorito]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el ID especificado
    consulta = "SELECT * FROM favoritos WHERE id_usuario = %s"

    # Ejecutar la consulta con el ID como parámetro
    cursor.execute(consulta, (id,))

    # Obtener el resultado
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    favoritos = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        favorito = Favorito(**resultado)
        favoritos.append(favorito)

    return favoritos


def obtenerFavoritosByIdUserAndName(id_usuario: int,id_establecimiento: int) -> List[Favorito]:
    # Crear cursor
    cursor = conexion.cursor(dictionary=True)

    # Consulta SQL para obtener el usuario con el ID especificado
    consulta = "SELECT * FROM favoritos WHERE id_usuario = %s AND id_establecimiento = %s"

    # Ejecutar la consulta con el ID como parámetro
    cursor.execute(consulta, (id_usuario,id_establecimiento,))

    # Obtener el resultado
    resultados = cursor.fetchall()

    # Cerrar cursor y conexión
    cursor.close()
    # conexion.close()

    # Lista para almacenar los usuarios
    favoritos = []

    # Iterar sobre los resultados y crear objetos Usuario
    for resultado in resultados:
        favorito = Favorito(**resultado)
        favoritos.append(favorito)

    return favoritos