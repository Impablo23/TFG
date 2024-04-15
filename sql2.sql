create database tfg3;
use tfg3;
create table if not EXISTS roles(
	id int PRIMARY KEY,
    rol varchar(50)
);

insert into roles (id, rol) values (1,"admin");
insert into roles (id, rol) values (2,"user");

CREATE TABLE if not EXISTS usuarios(
	id int PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    passwd varchar(255),
    nombreCompleto VARCHAR(255),
    idRol int,
    token varchar(255),
    CONSTRAINT FOREIGN KEY (idRol) REFERENCES tfg.roles(id)  
);


INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token) VALUES ('pablo@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'Pablo Admin', 1, 'd4df6eff-c660-4b8d-a6df-d83baa5ad0f6');
INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token) VALUES ('ivan@user.com', '2c42e5cf1cdbafea04ed267018ef1511', 'Ivan User', 2, 'eca44a4e-d1e4-4e6e-ba80-a31c394a3279');
INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token) VALUES ('juan@gmail.com', 'a94652aa97c7211ba8954dd15a3cf838', 'juan', 2, '833917c0-cc27-45f9-954d-30a1d615e82d');
INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token) VALUES ('pablo@user.com', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 2, '4bb0c60f-0121-474c-97bd-ed7e07a8d4f0');
INSERT INTO usuarios (email, passwd, nombreCompleto, idRol, token) VALUES ('pabloggg@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'Pablo Admin', 1, 'd4df6eff-c660-4b8d-a6df-d83baa5ad0f6');

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

INSERT INTO categorias (nombre) VALUES
('Camperos'),
('Carnes'),
('Pescados'),
('Bocadillos'),
('Pastas');


CREATE TABLE IF NOT EXISTS zonas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

INSERT INTO zonas (nombre) VALUES
('Playamar'),
('La Colina'),
('Los Álamos'),
('El Pinillo'),
('Montemar Alto'),
('Calvario');



CREATE TABLE IF NOT EXISTS establecimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    id_zona INT,
    nombre VARCHAR(255),
    descripcion TEXT,
    numResenas INT,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    foto TEXT,
    enlace TEXT
);

INSERT INTO establecimientos (id_categoria, id_zona, nombre, descripcion, numResenas, direccion, telefono, foto, enlace) VALUES
(2, 3, 'Lanjaron', 'Descripción del Establecimiento 1', 2009, 'Av. del Lido, 11, 29620 Torremolinos, Málaga', '1234567890', '', 'https://www.google.com/search?gs_ssp=eJwFwcENgCAMAMD41SUw8U_tA6MjuEWphWgUkoKR8b3rBxvtXCP7jz_otgnasWDwKwYIiLTOGzRGx4AshF6W4I59VCmVXqVUxdyULtKcTM2q8uT7TLn8kS0dBQ&q=restaurante+lanjaron+torremolinos&oq=restaurante+lanjaron&gs_lcrp=EgZjaHJvbWUqEAgAEC4YrwEYxwEYgAQYjgUyEAgAEC4YrwEYxwEYgAQYjgUyBggBEEUYOTIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0Njk0ajBqOagCALACAA&sourceid=chrome&ie=UTF-8'),
(2, 3, 'El Faro', 'Descripción del Establecimiento 3', 1800, 'Paseo Marítimo, 5, 29620 Torremolinos, Málaga', '1357924680', '', 'https://www.google.com/search?gs_ssp=eJwFwcENgCAMAMD41SUw8U_tA6MjuEWphWgUkoKR8b3rBxvtXCP7jz_otgnasWDwKwYIiLTOGzRGx4AshF6W4I59VCmVXqVUxdyULtKcTM2q8uT7TLn8kS0dBQ&q=restaurante+el+faro+torremolinos&oq=restaurante+el+faro&gs_lcp=EgZjaHJvbWUqEAgAEC4YrwEYxwEYgAQYjgUyEAgAEC4YrwEYxwEYgAQYjgUyBggBEEUYOTIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0Njk0ajBqOagCALACAA&sourceid=chrome&ie=UTF-8');


CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_establecimiento INT
);

INSERT INTO favoritos (id_usuario, id_establecimiento) VALUES
(1, 3),
(1, 3);

CREATE TABLE IF NOT EXISTS sugerencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre VARCHAR(255),
    enlace TEXT
);

INSERT INTO sugerencias (id_usuario, nombre, enlace) VALUES
(2, 'Tiki', 'https://www.google.com/search?gs_ssp=eJzj4tZP1zcsKSyIzyk3MGC0UjGoSDE3SktKTTVNNEo1SzQ3tjKoSDI0NTAxNjS1SDIyNrcwS_USLMnMzlQoyS8qSs3Nz8nMyy8GANs-FaA&q=tiki+torremolinos&oq=tiki&gs_lcrp=EgZjaHJvbWUqEAgFEC4YrwEYxwEYgAQYjgUyCQgAEEUYORiABDINCAEQABiDARixAxiABDIKCAIQABixAxiABDINCAMQABiDARixAxiABDIJCAQQABgKGIAEMhAIBRAuGK8BGMcBGIAEGI4FMg0IBhAuGK8BGMcBGIAEMgcIBxAAGIAEMg8ICBAAGAoYgwEYsQMYgAQyBwgJEC4YgATSAQgyMzc3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&safe=active&ssui=on');

INSERT INTO sugerencias (id_usuario, nombre, enlace) VALUES
(3, 'Tiki', 'https://www.google.com/search?gs_ssp=eJzj4tZP1zcsKSyIzyk3MGC0UjGoSDE3SktKTTVNNEo1SzQ3tjKoSDI0NTAxNjS1SDIyNrcwS_USLMnMzlQoyS8qSs3Nz8nMyy8GANs-FaA&q=tiki+torremolinos&oq=tiki&gs_lcrp=EgZjaHJvbWUqEAgFEC4YrwEYxwEYgAQYjgUyCQgAEEUYORiABDINCAEQABiDARixAxiABDIKCAIQABixAxiABDINCAMQABiDARixAxiABDIJCAQQABgKGIAEMhAIBRAuGK8BGMcBGIAEGI4FMg0IBhAuGK8BGMcBGIAEMgcIBxAAGIAEMg8ICBAAGAoYgwEYsQMYgAQyBwgJEC4YgATSAQgyMzc3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&safe=active&ssui=on');
