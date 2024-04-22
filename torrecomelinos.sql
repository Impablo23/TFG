-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 22-04-2024 a las 09:05:03
-- Versión del servidor: 8.0.36-0ubuntu0.22.04.1
-- Versión de PHP: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `torrecomelinos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Camperos'),
(2, 'Carnes'),
(3, 'Pescados'),
(4, 'Bocadillos'),
(5, 'Pastas'),
(9, 'Burguer'),
(14, 'Hamburguesas'),
(21, 's'),
(22, 'ff');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE `establecimientos` (
  `id` int NOT NULL,
  `id_categoria` int DEFAULT NULL,
  `id_zona` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `numResenas` int DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `foto` text,
  `enlace` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`id`, `id_categoria`, `id_zona`, `nombre`, `descripcion`, `numResenas`, `direccion`, `telefono`, `foto`, `enlace`) VALUES
(1, 2, 3, 'Lanjaron', 'Descripción del Establecimiento 1', 2009, 'Av. del Lido, 11, 29620 Torremolinos, Málaga', '1234567890', '', 'https://www.google.com/search?gs_ssp=eJwFwcENgCAMAMD41SUw8U_tA6MjuEWphWgUkoKR8b3rBxvtXCP7jz_otgnasWDwKwYIiLTOGzRGx4AshF6W4I59VCmVXqVUxdyULtKcTM2q8uT7TLn8kS0dBQ&q=restaurante+lanjaron+torremolinos&oq=restaurante+lanjaron&gs_lcrp=EgZjaHJvbWUqEAgAEC4YrwEYxwEYgAQYjgUyEAgAEC4YrwEYxwEYgAQYjgUyBggBEEUYOTIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0Njk0ajBqOagCALACAA&sourceid=chrome&ie=UTF-8'),
(2, 2, 3, 'El Faro', 'Descripción del Establecimiento 3', 1800, 'Paseo Marítimo, 5, 29620 Torremolinos, Málaga', '1357924680', '', 'https://www.google.com/search?gs_ssp=eJwFwcENgCAMAMD41SUw8U_tA6MjuEWphWgUkoKR8b3rBxvtXCP7jz_otgnasWDwKwYIiLTOGzRGx4AshF6W4I59VCmVXqVUxdyULtKcTM2q8uT7TLn8kS0dBQ&q=restaurante+el+faro+torremolinos&oq=restaurante+el+faro&gs_lcp=EgZjaHJvbWUqEAgAEC4YrwEYxwEYgAQYjgUyEAgAEC4YrwEYxwEYgAQYjgUyBggBEEUYOTIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0Njk0ajBqOagCALACAA&sourceid=chrome&ie=UTF-8'),
(3, 2, 2, 'd', '', 0, '', '', '', ''),
(12, 1, 3, 'f', '', 0, '', '', '', ''),
(13, 2, 3, 'vsfd', '', 0, '', '', '', ''),
(15, 14, 6, 'pepin', '', 0, '', '', '', ''),
(16, 5, 4, 'juan', '', 0, '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_establecimiento` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `id_usuario`, `id_establecimiento`) VALUES
(3, 2, 1),
(4, 2, 2),
(36, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `id` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `hora` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id`, `id_usuario`, `estado`, `hora`) VALUES
(104, 2, 'Desconectado', '2024-04-18 15:59:43'),
(105, 1, 'Conectado', '2024-04-18 16:00:17'),
(106, 1, 'Desconectado', '18/4/2024 18:02:45'),
(107, 1, 'Conectado', '18/4/2024 18:03:14'),
(108, 1, 'Desconectado', '18/4/2024 18:08:29'),
(109, 1, 'Conectado', '18/4/2024 18:08:36'),
(110, 1, 'Desconectado', '18/4/2024 18:08:39'),
(111, 2, 'Conectado', '18/4/2024 18:08:45'),
(112, 2, 'Desconectado', '18/4/2024 18:08:48'),
(113, 2, 'Conectado', '18/4/2024 18:08:58'),
(114, 2, 'Desconectado', '18/4/2024 18:09:01'),
(115, 1, 'Conectado', '18/4/2024 18:09:08'),
(116, 1, 'Desconectado', '18/4/2024 18:26:45'),
(117, 1, 'Conectado', '18/4/2024 18:26:53'),
(118, 1, 'Desconectado', '18/4/2024 18:39:48'),
(119, 1, 'Conectado', '18/4/2024 18:40:19'),
(120, 1, 'Desconectado', '18/4/2024 18:40:38'),
(121, 22, 'Conectado', '18/4/2024 18:40:48'),
(122, 22, 'Desconectado', '18/4/2024 18:40:52'),
(123, 22, 'Conectado', '18/4/2024 18:41:09'),
(124, 22, 'Desconectado', '18/4/2024 18:41:17'),
(125, 1, 'Conectado', '18/4/2024 18:41:24'),
(126, 1, 'Desconectado', '18/4/2024 18:42:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `rol` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sugerencias`
--

CREATE TABLE `sugerencias` (
  `id` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `enlace` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sugerencias`
--

INSERT INTO `sugerencias` (`id`, `id_usuario`, `nombre`, `enlace`) VALUES
(1, 2, 'Tiki', 'https://www.google.com/search?gs_ssp=eJzj4tZP1zcsKSyIzyk3MGC0UjGoSDE3SktKTTVNNEo1SzQ3tjKoSDI0NTAxNjS1SDIyNrcwS_USLMnMzlQoyS8qSs3Nz8nMyy8GANs-FaA&q=tiki+torremolinos&oq=tiki&gs_lcrp=EgZjaHJvbWUqEAgFEC4YrwEYxwEYgAQYjgUyCQgAEEUYORiABDINCAEQABiDARixAxiABDIKCAIQABixAxiABDINCAMQABiDARixAxiABDIJCAQQABgKGIAEMhAIBRAuGK8BGMcBGIAEGI4FMg0IBhAuGK8BGMcBGIAEMgcIBxAAGIAEMg8ICBAAGAoYgwEYsQMYgAQyBwgJEC4YgATSAQgyMzc3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&safe=active&ssui=on');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `passwd` varchar(255) DEFAULT NULL,
  `nombreCompleto` varchar(255) DEFAULT NULL,
  `idRol` int DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `passwd`, `nombreCompleto`, `idRol`, `token`) VALUES
(1, 'pablo@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'Pablo Admind', 1, 'd8ad86ff-ba8a-40b4-add2-05da64a6ed7a'),
(2, 'ivan@user.com', '2c42e5cf1cdbafea04ed267018ef1511', 'Ivan User', 2, '23e7c1b6-bb84-46b2-bf9e-a3afe2846841'),
(3, 'juan@gmail.com', 'a94652aa97c7211ba8954dd15a3cf838', 'juan', 2, '833917c0-cc27-45f9-954d-30a1d615e82d'),
(4, 'pablo@user.com', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 2, '4bb0c60f-0121-474c-97bd-ed7e07a8d4f0'),
(5, 'pabloggg@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'Pablo Admin', 1, 'd4df6eff-c660-4b8d-a6df-d83baa5ad0f6'),
(18, 'ffgg@gmail.com', '66952c6203ae23242590c0061675234d', 'fffff', 2, ''),
(22, 'pepin@gmail.com', 'dd4b21e9ef71e1291183a46b913ae6f2', 'pepin', 2, '390176f9-a3d9-4486-8f4a-fe888913a1db');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

CREATE TABLE `zonas` (
  `id` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `zonas`
--

INSERT INTO `zonas` (`id`, `nombre`) VALUES
(6, 'Calvario'),
(4, 'El Pinillo'),
(30, 'frwfdsa'),
(2, 'La Colina'),
(3, 'Los Álamos'),
(5, 'Montemar Alto'),
(1, 'Playamar');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_zona` (`id_zona`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_establecimiento` (`id_establecimiento`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `zonas`
--
ALTER TABLE `zonas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `nombre_2` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  ADD CONSTRAINT `establecimientos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `establecimientos_ibfk_2` FOREIGN KEY (`id_zona`) REFERENCES `zonas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_establecimiento`) REFERENCES `establecimientos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  ADD CONSTRAINT `sugerencias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
