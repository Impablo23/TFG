from typing import Union
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from FastAPI.cruds.crud import *
from datetime import datetime,timedelta, timezone
from jose import jwt,JWTError

import os

from dotenv import load_dotenv

load_dotenv()

api = FastAPI()

oauth2_scheme = OAuth2PasswordBearer("/token")

SECRET_KEY = os.getenv("SECRET_KEY") # HAY QUE PONER ESTO COMO VARIABLES DE ENTORNO
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# Configurar los orígenes permitidos para CORS
origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://143.47.34.198"
]

# Habilitar CORS
api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def autenticar_usuario(email: str, password: str):
    user = obtenerUserByEmailAndPass(email,password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales Inválidas", headers={"WWW-Authenticate": "Bearer"})

    return user

def crear_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


def obtener_usuario_actual(token : str = Depends(oauth2_scheme)):
    try:
        token_decode = jwt.decode(token, SECRET_KEY, ALGORITHM)
        email = token_decode.get("sub")
        
        if email == None:
            raise HTTPException(status_code=401, detail="Credenciales Inválidas", headers={"WWW-Authenticate": "Bearer"})
    except:
        raise HTTPException(status_code=401, detail="Credenciales Inválidas", headers={"WWW-Authenticate": "Bearer"})

    user = obtenerUserByEmail(email)
    
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales Inválidas", headers={"WWW-Authenticate": "Bearer"})
    
    return user



@api.get("/users/me")
def user_me(user: Usuario = Depends(obtener_usuario_actual)):
    return user


@api.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    passwd = encriptar_md5(form_data.password)
    usuario = autenticar_usuario(form_data.username, passwd)
    if usuario:  # Verifica si el usuario fue autenticado correctamente
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token_jwt = crear_token({"sub": usuario[0].email}, access_token_expires)
        return {
            "access_token": access_token_jwt,
            "token_type": "bearer"
        }
    else:
        return {"error": "Credenciales inválidas"}

        

#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------USUARIOS-----------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# APARTADO PARA OBTENER TODOS LOS DATOS DE LA BBDD DE LOS USUARIOS
@api.get("/users")
async def users(user: Usuario = Depends(obtener_usuario_actual)):
    users_list = obtener_usuarios()
    return users_list

@api.get("/users/id/{id}")
async def userById(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    users_list_by_id = obtener_usuario_por_id(id)
    
    return users_list_by_id

@api.get("/users/email/{email}")
async def UserByEmail(email: str):
    # Obtener usuario por correo electrónico
    user_by_email = obtenerUserByEmail(email)
    
    # Verificar si se encontró el usuario
    if user_by_email:
        # Devolver el usuario encontrado
        return user_by_email
    else:
        # Si no se encuentra el usuario, devolver un mensaje de error
        return {"mensaje": "Usuario no encontrado"}
    
    
@api.post("/users/register")
async def registrar(usuario: Usuario):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token,verificado) VALUES (%s, %s, %s, %s, %s,0)"

        # Datos del nuevo usuario
        datos_usuario = (usuario.email, usuario.passwd, usuario.nombreCompleto, usuario.idRol, usuario.token)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_usuario):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Usuario agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar el usuario")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
      
@api.post("/users/add")
async def agregar_usuario(usuario: Usuario,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token,verificado) VALUES (%s, %s, %s, %s, %s,1)"

        # Datos del nuevo usuario
        datos_usuario = (usuario.email, usuario.passwd, usuario.nombreCompleto, usuario.idRol, usuario.token)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_usuario):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Usuario agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar el usuario")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
     
@api.put("/users/edit")   
async def editar_usuario(usuario: Usuario,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para editar un usuario existente
        consulta = "UPDATE usuarios SET email = %s, passwd = %s, nombreCompleto = %s, idRol = %s, token = %s, verificado = %s WHERE id = %s"

        # Datos actualizados del usuario
        datos_usuario = (usuario.email, usuario.passwd, usuario.nombreCompleto, usuario.idRol, usuario.token,usuario.verificado, usuario.id)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_usuario):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Usuario editado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al editar el usuario")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")

@api.delete("/users/delete/{id}")   
# Función para eliminar un usuario
async def eliminar_usuario(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para eliminar un usuario por su ID
        consulta = "DELETE FROM usuarios WHERE id = %s"

        # Datos del usuario a eliminar
        datos_usuario = (id,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_usuario):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Usuario eliminado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al eliminar el usuario")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
     
@api.get("/users/{email}/{passwd}")
async def UserByEmailAndPass(email:str, passwd: str,user: Usuario = Depends(obtener_usuario_actual)):
    
    user_by_email_passwd = obtenerUserByEmailAndPass(email,passwd)
    
    return user_by_email_passwd


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------REGISTRO-----------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------


@api.post("/registros/add")
async def agregar_registro(registro: Registro,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO registro (id_usuario, estado,hora) VALUES (%s, %s, %s)"

        # Datos del nuevo usuario
        datos_registro = (registro.id_usuario,registro.estado,registro.hora)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_registro):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Registro agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar el registro")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")


@api.get('/registros')
async def registros(user: Usuario = Depends(obtener_usuario_actual)):
    registros_list = obtener_registros()
    return registros_list


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------ZONAS--------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# APARTADO PARA OBTENER TODOS LOS DATOS DE LA BBDD DE LAS ZONAS Y CATEGORIAS
@api.get("/zonas")
async def zonas(user: Usuario = Depends(obtener_usuario_actual)):
    zonas_list = obtener_zonas()
    return zonas_list


@api.get("/zonas/id/{id}")
async def zonasById(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    zonas_list_by_id = obtenerZonaById(id)
    
    return zonas_list_by_id

@api.get("/zonas/nombre/{nombre}")
async def zonasByName(nombre: str,user: Usuario = Depends(obtener_usuario_actual)):
    
    zonas_list_by_name = obtenerZonaByName(nombre)
    
    return zonas_list_by_name

@api.post("/zonas/add")
async def agregar_zona(zona: Zona,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO zonas (nombre) VALUES (%s)"
        
        zona_minusculas = zona.nombre.lower()

        # Datos del nuevo usuario
        datos_zonas = (zona_minusculas,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_zonas):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Zona agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar la zona")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(500, "Error al agregar la zona")
    
@api.put("/zonas/edit")   
async def editar_zona(zona: Zona,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para editar un usuario existente
        consulta = "UPDATE zonas SET nombre = %s WHERE id = %s"
        
        zona_minusculas = zona.nombre.lower()

        # Datos actualizados del usuario
        datos_zonas = (zona_minusculas,zona.id)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_zonas):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Zona editada correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al editar la zona")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    
    
@api.delete("/zonas/delete/{id}")   
# Función para eliminar un usuario
async def eliminar_zona(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para eliminar un usuario por su ID
        consulta = "DELETE FROM zonas WHERE id = %s"

        # Datos del usuario a eliminar
        datos_zonas = (id,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_zonas):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Zona eliminada correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al eliminar la zona")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------CATEGORIAS---------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

@api.get("/categorias")
async def categorias(user: Usuario = Depends(obtener_usuario_actual)):
    categorias_list = obtener_categorias()
    return categorias_list

@api.get("/categorias/id/{id}")
async def categoriasById(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    categorias_list_by_id = obtenerCategoriaById(id)
    
    return categorias_list_by_id

@api.get("/categorias/nombre/{nombre}")
async def categoriasByName(nombre: str,user: Usuario = Depends(obtener_usuario_actual)):
    
    categorias_list_by_name = obtenerCategoriaByName(nombre)
    
    return categorias_list_by_name

@api.post("/categorias/add")
async def agregar_categoria(categoria: Categoria,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO categorias (nombre) VALUES (%s)"
        
        categoria_minusculas = categoria.nombre.lower()

        # Datos del nuevo usuario
        datos_categorias = (categoria_minusculas,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_categorias):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Categoria agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar la categoria")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(500, "Error al agregar la zona")
    
@api.put("/categorias/edit")   
async def editar_categoria(categoria: Categoria,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para editar un usuario existente
        consulta = "UPDATE categorias SET nombre = %s WHERE id = %s"
        
        categoria_minusculas = categoria.nombre.lower()

        # Datos actualizados del usuario
        datos_categorias = (categoria_minusculas,categoria.id)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_categorias):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Categoria editada correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al editar la categoria")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    
    
@api.delete("/categorias/delete/{id}")   
# Función para eliminar un usuario
async def eliminar_categoria(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para eliminar un usuario por su ID
        consulta = "DELETE FROM categorias WHERE id = %s"

        # Datos del usuario a eliminar
        datos_categorias = (id,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_categorias):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Categoria eliminada correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al eliminar la categoria")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")

#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------ROLES--------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# APARTADO PARA OBTENER TODOS LOS DATOS DE LA BBDD DE LOS ROLES
@api.get("/roles")
async def roles():
    roles_list = obtener_roles()
    return roles_list


#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------ESTABLECIMIENTOS---------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# APARTADO PARA OBTENER TODOS LOS DATOS DE LA BBDD DE LOS ESTABLECIMIENTOS
@api.get("/establecimientos")
async def establecimientos(user: Usuario = Depends(obtener_usuario_actual)):
    establecimientos_list = obtener_establecimientos()
    return establecimientos_list


@api.get("/establecimientos/id/{id}")
async def establecimientosById(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    establecimientos_list_by_id = obtener_establecimiento_por_id(id)
    
    return establecimientos_list_by_id

@api.get("/establecimientos/name/{name}")
async def establecimientosById(name:str,user: Usuario = Depends(obtener_usuario_actual)):
    
    establecimientos_list_by_name = obtener_establecimiento_por_nombre(name)
    
    return establecimientos_list_by_name

@api.post("/establecimientos/add")
async def agregar_establecimiento(establecimiento: Establecimiento,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO establecimientos (id_categoria, id_zona, nombre, descripcion, numResenas, direccion, telefono, foto, enlace) VALUES(%s, %s, %s, %s, %s,%s, %s, %s, %s)"

        # Datos del nuevo usuario
        datos_establecimiento = (establecimiento.id_categoria,establecimiento.id_zona,establecimiento.nombre,establecimiento.descripcion,establecimiento.numResenas,establecimiento.direccion,establecimiento.telefono,establecimiento.foto,establecimiento.enlace)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_establecimiento):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Establecimiento agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar el establecimiento")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")


@api.put("/establecimientos/edit")   
async def editar_establecimiento(establecimiento: Establecimiento,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para editar un usuario existente
        consulta = "UPDATE establecimientos SET id_categoria = %s, id_zona = %s, nombre = %s, descripcion = %s, numResenas = %s, direccion = %s, telefono = %s, foto = %s, enlace = %s WHERE id = %s;"

        # Datos actualizados del usuario
        datos_establecimiento = (establecimiento.id_categoria,establecimiento.id_zona,establecimiento.nombre,establecimiento.descripcion,establecimiento.numResenas,establecimiento.direccion,establecimiento.telefono,establecimiento.foto,establecimiento.enlace,establecimiento.id)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_establecimiento):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Establecimiento editado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al editar el establecimiento")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    
@api.delete("/establecimientos/delete/{id}")   
# Función para eliminar un usuario
async def eliminar_establecimiento(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para eliminar un usuario por su ID
        consulta = "DELETE FROM establecimientos WHERE id = %s"

        # Datos del usuario a eliminar
        datos_establecimiento = (id,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_establecimiento):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Establecimiento eliminado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al eliminar el establecimiento")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    
    
    
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------SUGERENCIAS--------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------

# APARTADO PARA OBTENER TODOS LOS DATOS DE LA BBDD DE LAS SUGERENCIAS
@api.get("/sugerencias")
async def sugerencias(user: Usuario = Depends(obtener_usuario_actual)):
    sugerencias_list = obtener_sugerencias()
    return sugerencias_list

@api.get("/sugerencias/id/{id}")
async def sugerenciasById(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    sugerencias_list_by_id = obtenerSugerenciaById(id)
    
    return sugerencias_list_by_id

@api.delete("/sugerencias/delete/{id}")   
# Función para eliminar un usuario
async def eliminar_sugerencia(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para eliminar un usuario por su ID
        consulta = "DELETE FROM sugerencias WHERE id = %s"

        # Datos del usuario a eliminar
        datos_sugerencia = (id,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_sugerencia):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Sugerencia eliminada correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al eliminar la sugerencia")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    
    
@api.post("/sugerencias/add")
async def agregar_sugerencia(sugerencia: Sugerencia,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO sugerencias (id_usuario,nombre,enlace) VALUES (%s,%s,%s)"

        # Datos del nuevo usuario
        datos_sugerencia = (sugerencia.id_usuario,sugerencia.nombre,sugerencia.enlace)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_sugerencia):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Sugerencia agregada correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar la sugerencia")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(500, "Error al agregar la sugerencia")
    
    
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#---------------------------------------------FAVORITOS----------------------------------------------------
#----------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------


# APARTADO PARA OBTENER TODOS LOS DATOS DE LA BBDD DE LAS SUGERENCIAS
@api.get("/favoritos")
async def favoritos(user: Usuario = Depends(obtener_usuario_actual)):
    favoritos_list = obtener_favoritos()
    return favoritos_list


@api.get("/favoritos/id_usuario/{id}")
async def favoritossByIdUser(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    favoritos_list_by_id = obtenerFavoritosByIdUser(id)
    
    return favoritos_list_by_id

@api.get("/favoritos/id_usuario/{id_usuario}/id_establecimiento/{id_establecimiento}")
async def favoritossByIdUserAndName(id_usuario: int,id_establecimiento: int,user: Usuario = Depends(obtener_usuario_actual)):
    
    favoritos_list_by_id = obtenerFavoritosByIdUserAndName(id_usuario,id_establecimiento)
    
    return favoritos_list_by_id

@api.post("/favoritos/add")
async def agregar_favorito(favorito: Favorito,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para insertar un nuevo usuario
        consulta = "INSERT INTO favoritos (id_usuario,id_establecimiento) VALUES (%s,%s)"

        # Datos del nuevo usuario
        datos_favorito = (favorito.id_usuario,favorito.id_establecimiento)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_favorito):
            # Devolver un diccionario con la información del usuario recién agregado
            return {"mensaje": "Favorito agregado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al agregar el favorito")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(500, "Error al agregar el favorito")
    
    
@api.delete("/favoritos/delete/{id}")   
# Función para eliminar un usuario
async def eliminar_favorito(id: int,user: Usuario = Depends(obtener_usuario_actual)):
    try:
        # Consulta SQL para eliminar un usuario por su ID
        consulta = "DELETE FROM favoritos WHERE id = %s"

        # Datos del usuario a eliminar
        datos_favorito = (id,)

        # Ejecutar la consulta
        if ejecutar_consulta(consulta, datos_favorito):
            # Devolver un diccionario con un mensaje de éxito
            return {"mensaje": "Favorito eliminado correctamente"}
        else:
            # Si ocurrió un error al ejecutar la consulta, lanzar una excepción HTTP 500
            raise HTTPException(status_code=500, detail="Error al eliminar el favorito")
    except Exception as e:
        # Si ocurre un error inesperado, lanzar una excepción HTTP 500
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")