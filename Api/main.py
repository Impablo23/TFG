from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar los orígenes permitidos para CORS
origins = [
    "http://localhost",
    "http://localhost:4200",
]

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"mensaje": "Vamos al Backend colegui", "descripcion": "Irse todos pal kiriki"}