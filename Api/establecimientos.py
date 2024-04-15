from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, MySQLDsn
import mysql.connector

from FastAPI.cruds.establecimientosCrud import *

apiEstablecimientos = FastAPI()

# Configurar los orígenes permitidos para CORS
origins = [
    "http://localhost",
    "http://localhost:4200",
]

# Habilitar CORS
apiEstablecimientos.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@apiEstablecimientos.get("/establecimientos")
async def establecimientos():
    establecimientos_list = obtener_establecimientos()
    return establecimientos_list