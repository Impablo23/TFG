-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 30-04-2024 a las 06:53:44
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
(1, 'campeross'),
(2, 'Carnes'),
(3, 'Pescados'),
(4, 'Bocadillos'),
(5, 'Pastas'),
(9, 'Burguer'),
(14, 'Hamburguesas');

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
(1, 2, 3, 'Lanjaron maricons', 'Descripción del Establecimiento 1', 2009, 'Av. del Lido, 11, 29620 Torremolinos, Málaga', '1234567890ff', '', 'https://www.google.com/search?gs_ssp=eJwFwcENgCAMAMD41SUw8U_tA6MjuEWphWgUkoKR8b3rBxvtXCP7jz_otgnasWDwKwYIiLTOGzRGx4AshF6W4I59VCmVXqVUxdyULtKcTM2q8uT7TLn8kS0dBQ&q=restaurante+lanjaron+torremolinos&oq=restaurante+lanjaron&gs_lcrp=EgZjaHJvbWUqEAgAEC4YrwEYxwEYgAQYjgUyEAgAEC4YrwEYxwEYgAQYjgUyBggBEEUYOTIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0Njk0ajBqOagCALACAA&sourceid=chrome&ie=UTF-8'),
(2, 2, 3, 'El Faroddr', 'Descripción del Establecimiento 3', 1800, 'Paseo Marítimo, 5, 29620 Torremolinos, Málaga', '1357924680', '', 'https://www.google.com/search?gs_ssp=eJwFwcENgCAMAMD41SUw8U_tA6MjuEWphWgUkoKR8b3rBxvtXCP7jz_otgnasWDwKwYIiLTOGzRGx4AshF6W4I59VCmVXqVUxdyULtKcTM2q8uT7TLn8kS0dBQ&q=restaurante+el+faro+torremolinos&oq=restaurante+el+faro&gs_lcp=EgZjaHJvbWUqEAgAEC4YrwEYxwEYgAQYjgUyEAgAEC4YrwEYxwEYgAQYjgUyBggBEEUYOTIHCAIQABiABDIICAMQABgWGB4yCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg0Njk0ajBqOagCALACAA&sourceid=chrome&ie=UTF-8'),
(3, 2, 2, 'd', '', 0, '', '', '', ''),
(12, 1, 3, 'f', '', 0, '', '', '', ''),
(13, 2, 3, 'vsfd', '', 0, '', '', '', ''),
(15, 14, 6, 'pepin', '', 0, '', '', '', ''),
(16, 5, 4, 'juan', '', 0, '', '', '', ''),
(19, 3, 3, 'Playa Arubaffgg', 'eresadsadsd', 1000, 'ññ', '22334455', 'data:image/jpeg;base64,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', 'https://www.google.com/search?sca_esv=5d0811d5ae0715ef&sca_upv=1&sxsrf=ACQVn0-sHIE__fdmUNzDU2bvLQW0SgbUOA:1713886303062&q=playa+aruba&source=lnms&uds=AMwkrPsKdw6NKXr7dpE0DWrb0bVb-hU5D8Sp8JRXIqBsAmpjaE0zbWJG6u0D4bSV0jb7BjZhkD3RVGyfvoR00JbQKG1X855YQh3tG89NozaKrd6N9VnroBR9N7njHwYWLz7Bc7hb0lVCBWfkOXThmkeH5ZZzEwGoEHLVlvs7QmExMA5Y_-lRXYtsCKElj9XUmLgbrTxu_hDAsyCZQrzz5i2fY8695Cf79cUxQOt9LLzfXlriFo-OikKcxQdNqUfGIHEZlp0LxuV7YQz8MwRLwns1AxY8nofo0A&sa=X&ved=2ahUKEwinzp2C1NiFAxWWUaQEHc5oCQ8Q0pQJegQIDxAB&biw=1536&bih=695&dpr=1.25'),
(20, 2, 5, 'ff', '', 0, '', '', '', ''),
(22, 2, 3, 'q', '', 0, '', '', '', ''),
(25, 3, 3, 'qqtt', '3', 300, '3', '3', '3', '3'),
(28, 2, 3, 'ff', 'f', 0, 'f', '', '', ''),
(29, 5, 2, 'dfcd', '', 0, '', '', '', 'dsc'),
(31, 2, 5, 'dfcd', '', 0, '', '', '', 'dsc'),
(32, 2, 2, 'r', '', 0, 'd', '', '', 'r'),
(33, 2, 3, 'eee', '', 0, '', '', '', ''),
(34, 2, 2, 'dcd', '', 0, '', '', '', 'cdsc'),
(35, 9, 2, 'gg', '', 0, '', '', '', ''),
(36, 9, 2, 'f', '', 0, '', '', '', 'f'),
(37, 14, 2, 'e', '', 0, '', '', '', 'e'),
(38, 1, 2, 'ww', '', 0, '', '', '', 'ww'),
(39, 3, 3, 'pepin', 'dd', 100, 'dd', 'dd', 'd', 'd'),
(40, 2, 3, 'fr', '', 0, '', '', '', 'ed');

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
(37, 3, 2),
(75, 2, 29),
(79, 59, 2),
(80, 59, 1),
(82, 1, 1);

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
(125, 1, 'Conectado', '18/4/2024 18:41:24'),
(126, 1, 'Desconectado', '18/4/2024 18:42:17'),
(127, 1, 'Conectado', '22/4/2024 13:03:33'),
(128, 1, 'Desconectado', '22/4/2024 14:23:59'),
(129, 1, 'Conectado', '22/4/2024 14:24:42'),
(130, 1, 'Conectado', '22/4/2024 14:50:11'),
(131, 1, 'Desconectado', '22/4/2024 14:50:16'),
(132, 1, 'Conectado', '22/4/2024 14:50:24'),
(133, 1, 'Conectado', '22/4/2024 14:50:39'),
(134, 1, 'Conectado', '22/4/2024 14:51:05'),
(135, 1, 'Desconectado', '22/4/2024 16:45:20'),
(136, 1, 'Conectado', '22/4/2024 16:45:28'),
(137, 1, 'Desconectado', '22/4/2024 16:47:02'),
(138, 2, 'Conectado', '22/4/2024 16:47:10'),
(139, 2, 'Desconectado', '22/4/2024 16:47:50'),
(140, 1, 'Conectado', '22/4/2024 16:47:57'),
(141, 1, 'Desconectado', '22/4/2024 16:56:43'),
(142, 1, 'Desconectado', '22/4/2024 17:15:59'),
(143, 1, 'Desconectado', '22/4/2024 17:17:09'),
(144, 1, 'Desconectado', '22/4/2024 17:20:17'),
(145, 1, 'Desconectado', '22/4/2024 17:24:11'),
(146, 1, 'Desconectado', '22/4/2024 17:25:00'),
(147, 1, 'Desconectado', '22/4/2024 17:32:00'),
(148, 1, 'Desconectado', '22/4/2024 17:40:13'),
(149, 1, 'Desconectado', '22/4/2024 17:43:11'),
(150, 1, 'Desconectado', '22/4/2024 17:51:59'),
(151, 1, 'Conectado', '22/4/2024 17:52:06'),
(152, 1, 'Conectado', '23/4/2024 11:53:37'),
(153, 1, 'Desconectado', '23/4/2024 12:04:33'),
(154, 1, 'Conectado', '23/4/2024 12:04:44'),
(155, 1, 'Desconectado', '23/4/2024 12:05:27'),
(156, 1, 'Conectado', '23/4/2024 12:05:34'),
(157, 1, 'Desconectado', '23/4/2024 12:06:27'),
(158, 1, 'Conectado', '23/4/2024 12:06:40'),
(159, 1, 'Desconectado', '23/4/2024 12:07:40'),
(160, 1, 'Conectado', '23/4/2024 12:07:46'),
(161, 1, 'Desconectado', '23/4/2024 12:08:11'),
(162, 1, 'Conectado', '23/4/2024 12:08:19'),
(163, 1, 'Desconectado', '23/4/2024 12:10:22'),
(164, 1, 'Conectado', '23/4/2024 12:10:29'),
(165, 1, 'Desconectado', '23/4/2024 12:13:00'),
(166, 1, 'Conectado', '23/4/2024 12:13:06'),
(167, 1, 'Desconectado', '23/4/2024 12:14:07'),
(168, 1, 'Conectado', '23/4/2024 12:14:13'),
(169, 1, 'Desconectado', '23/4/2024 12:33:15'),
(170, 1, 'Conectado', '23/4/2024 12:33:25'),
(171, 1, 'Desconectado', '23/4/2024 12:34:06'),
(172, 1, 'Conectado', '23/4/2024 12:34:13'),
(173, 1, 'Desconectado', '23/4/2024 12:37:06'),
(174, 1, 'Conectado', '23/4/2024 12:37:13'),
(175, 1, 'Desconectado', '23/4/2024 12:39:09'),
(176, 1, 'Conectado', '23/4/2024 12:39:15'),
(177, 1, 'Desconectado', '23/4/2024 12:51:09'),
(178, 1, 'Conectado', '23/4/2024 13:00:05'),
(179, 1, 'Desconectado', '23/4/2024 13:00:14'),
(180, 1, 'Conectado', '23/4/2024 13:00:21'),
(181, 1, 'Desconectado', '23/4/2024 13:02:08'),
(182, 1, 'Conectado', '23/4/2024 13:02:19'),
(183, 1, 'Desconectado', '23/4/2024 13:03:06'),
(184, 1, 'Conectado', '23/4/2024 13:03:13'),
(185, 1, 'Desconectado', '23/4/2024 13:03:19'),
(186, 1, 'Conectado', '23/4/2024 13:03:31'),
(187, 1, 'Conectado', '23/4/2024 13:08:38'),
(188, 1, 'Desconectado', '23/4/2024 13:09:04'),
(189, 1, 'Conectado', '23/4/2024 13:09:14'),
(190, 1, 'Desconectado', '23/4/2024 13:09:25'),
(191, 1, 'Conectado', '23/4/2024 13:09:32'),
(192, 1, 'Desconectado', '23/4/2024 13:09:51'),
(193, 1, 'Conectado', '23/4/2024 13:09:58'),
(194, 1, 'Conectado', '23/4/2024 13:12:58'),
(195, 1, 'Desconectado', '23/4/2024 13:13:16'),
(196, 1, 'Conectado', '23/4/2024 13:13:24'),
(197, 1, 'Desconectado', '23/4/2024 13:13:40'),
(198, 1, 'Conectado', '23/4/2024 13:13:48'),
(199, 1, 'Desconectado', '23/4/2024 13:17:01'),
(200, 1, 'Conectado', '23/4/2024 13:17:12'),
(201, 1, 'Desconectado', '23/4/2024 13:18:59'),
(202, 1, 'Conectado', '23/4/2024 13:23:30'),
(203, 1, 'Desconectado', '23/4/2024 13:23:34'),
(204, 1, 'Desconectado', '23/4/2024 13:29:22'),
(205, 1, 'Desconectado', '23/4/2024 13:31:05'),
(206, 1, 'Desconectado', '23/4/2024 13:47:47'),
(207, 1, 'Desconectado', '23/4/2024 13:55:42'),
(208, 1, 'Desconectado', '23/4/2024 13:56:33'),
(209, 1, 'Desconectado', '23/4/2024 14:11:36'),
(210, 2, 'Desconectado', '23/4/2024 14:13:56'),
(211, 1, 'Desconectado', '23/4/2024 14:16:15'),
(213, 1, 'Desconectado', '23/4/2024 14:17:22'),
(214, 1, 'Desconectado', '23/4/2024 14:21:06'),
(215, 1, 'Desconectado', '23/4/2024 14:21:18'),
(216, 2, 'Desconectado', '23/4/2024 14:22:40'),
(217, 1, 'Desconectado', '23/4/2024 14:28:32'),
(218, 1, 'Desconectado', '23/4/2024 14:29:00'),
(219, 1, 'Desconectado', '23/4/2024 14:29:12'),
(220, 1, 'Desconectado', '23/4/2024 14:35:11'),
(221, 1, 'Desconectado', '23/4/2024 14:37:11'),
(222, 1, 'Desconectado', '23/4/2024 14:39:50'),
(223, 1, 'Desconectado', '23/4/2024 14:41:23'),
(224, 1, 'Desconectado', '23/4/2024 14:41:32'),
(225, 1, 'Desconectado', '23/4/2024 14:48:06'),
(226, 1, 'Desconectado', '23/4/2024 14:53:20'),
(227, 1, 'Desconectado', '23/4/2024 15:52:23'),
(228, 1, 'Desconectado', '23/4/2024 15:53:57'),
(229, 1, 'Desconectado', '23/4/2024 16:16:14'),
(230, 1, 'Desconectado', '23/4/2024 16:21:37'),
(231, 1, 'Desconectado', '23/4/2024 16:57:17'),
(232, 1, 'Desconectado', '23/4/2024 16:58:03'),
(233, 1, 'Desconectado', '23/4/2024 17:00:48'),
(234, 1, 'Desconectado', '23/4/2024 17:18:31'),
(235, 2, 'Desconectado', '23/4/2024 17:19:06'),
(236, 1, 'Desconectado', '23/4/2024 17:19:17'),
(237, 2, 'Desconectado', '23/4/2024 17:20:13'),
(238, 1, 'Desconectado', '23/4/2024 17:21:08'),
(239, 1, 'Desconectado', '23/4/2024 17:23:33'),
(240, 1, 'Desconectado', '23/4/2024 17:24:56'),
(241, 1, 'Conectado', '23/4/2024 17:25:05'),
(242, 1, 'Desconectado', '23/4/2024 17:27:00'),
(243, 1, 'Desconectado', '23/4/2024 17:28:05'),
(244, 1, 'Desconectado', '23/4/2024 17:28:54'),
(245, 1, 'Conectado', '23/4/2024 17:29:05'),
(246, 1, 'Desconectado', '23/4/2024 17:29:10'),
(247, 2, 'Conectado', '23/4/2024 17:29:17'),
(248, 1, 'Desconectado', '23/4/2024 17:30:19'),
(249, 2, 'Conectado', '23/4/2024 17:30:27'),
(250, 2, 'Desconectado', '23/4/2024 17:30:34'),
(251, 1, 'Conectado', '23/4/2024 17:30:41'),
(252, 1, 'Desconectado', '23/4/2024 17:40:40'),
(253, 1, 'Conectado', '23/4/2024 17:40:49'),
(254, 1, 'Desconectado', '23/4/2024 17:41:28'),
(255, 1, 'Conectado', '23/4/2024 17:41:36'),
(256, 1, 'Desconectado', '23/4/2024 17:42:13'),
(257, 2, 'Conectado', '23/4/2024 17:42:19'),
(258, 2, 'Desconectado', '23/4/2024 17:52:06'),
(259, 1, 'Conectado', '23/4/2024 17:52:14'),
(260, 1, 'Desconectado', '23/4/2024 17:53:36'),
(261, 1, 'Desconectado', '23/4/2024 17:54:15'),
(262, 1, 'Conectado', '23/4/2024 17:54:25'),
(263, 1, 'Desconectado', '23/4/2024 17:56:27'),
(264, 1, 'Conectado', '23/4/2024 17:56:35'),
(265, 1, 'Desconectado', '23/4/2024 17:58:18'),
(266, 1, 'Conectado', '23/4/2024 17:58:29'),
(267, 1, 'Desconectado', '23/4/2024 17:58:41'),
(268, 1, 'Conectado', '23/4/2024 17:58:57'),
(269, 1, 'Desconectado', '23/4/2024 17:59:41'),
(270, 2, 'Conectado', '23/4/2024 17:59:47'),
(271, 2, 'Desconectado', '23/4/2024 18:00:17'),
(274, 1, 'Conectado', '23/4/2024 18:01:08'),
(275, 1, 'Desconectado', '23/4/2024 18:01:42'),
(276, 1, 'Conectado', '23/4/2024 18:01:50'),
(277, 1, 'Desconectado', '23/4/2024 18:02:30'),
(278, 1, 'Conectado', '23/4/2024 18:02:52'),
(279, 1, 'Desconectado', '23/4/2024 18:03:47'),
(280, 1, 'Conectado', '23/4/2024 18:03:55'),
(281, 1, 'Desconectado', '23/4/2024 18:06:42'),
(282, 1, 'Conectado', '23/4/2024 18:06:50'),
(283, 1, 'Desconectado', '23/4/2024 18:07:16'),
(284, 2, 'Conectado', '23/4/2024 18:07:29'),
(285, 2, 'Desconectado', '23/4/2024 18:08:07'),
(286, 1, 'Conectado', '23/4/2024 18:08:26'),
(287, 1, 'Desconectado', '23/4/2024 18:08:43'),
(288, 1, 'Conectado', '23/4/2024 18:08:56'),
(289, 1, 'Desconectado', '23/4/2024 18:09:10'),
(290, 2, 'Conectado', '23/4/2024 18:09:18'),
(291, 2, 'Desconectado', '23/4/2024 18:09:36'),
(292, 1, 'Conectado', '23/4/2024 18:09:55'),
(293, 1, 'Desconectado', '23/4/2024 18:10:46'),
(294, 1, 'Conectado', '23/4/2024 18:10:54'),
(295, 1, 'Desconectado', '23/4/2024 18:11:16'),
(296, 2, 'Conectado', '23/4/2024 18:11:22'),
(297, 2, 'Desconectado', '23/4/2024 18:11:40'),
(302, 1, 'Conectado', '24/4/2024 12:37:36'),
(303, 1, 'Desconectado', '24/4/2024 12:37:59'),
(306, 1, 'Conectado', '24/4/2024 12:42:42'),
(307, 1, 'Desconectado', '24/4/2024 12:43:23'),
(312, 1, 'Conectado', '24/4/2024 12:50:09'),
(313, 1, 'Desconectado', '24/4/2024 12:50:56'),
(314, 1, 'Conectado', '24/4/2024 12:51:07'),
(315, 1, 'Desconectado', '24/4/2024 12:57:08'),
(316, 1, 'Conectado', '24/4/2024 12:57:15'),
(317, 1, 'Desconectado', '24/4/2024 13:06:05'),
(318, 1, 'Conectado', '24/4/2024 13:06:12'),
(319, 1, 'Desconectado', '24/4/2024 13:46:47'),
(320, 1, 'Conectado', '24/4/2024 13:46:58'),
(321, 1, 'Desconectado', '24/4/2024 13:47:17'),
(324, 1, 'Conectado', '24/4/2024 13:49:11'),
(325, 1, 'Desconectado', '24/4/2024 14:09:47'),
(326, 1, 'Conectado', '24/4/2024 14:10:03'),
(327, 1, 'Desconectado', '24/4/2024 14:17:14'),
(328, 1, 'Conectado', '24/4/2024 14:17:25'),
(329, 1, 'Desconectado', '24/4/2024 14:18:00'),
(332, 1, 'Conectado', '24/4/2024 14:20:29'),
(333, 1, 'Desconectado', '24/4/2024 14:25:36'),
(334, 1, 'Conectado', '24/4/2024 14:25:46'),
(335, 1, 'Desconectado', '24/4/2024 14:27:06'),
(336, 1, 'Conectado', '24/4/2024 14:27:13'),
(337, 1, 'Desconectado', '24/4/2024 14:28:57'),
(338, 1, 'Conectado', '24/4/2024 14:29:39'),
(339, 1, 'Desconectado', '24/4/2024 14:29:42'),
(340, 1, 'Conectado', '24/4/2024 14:30:30'),
(341, 1, 'Desconectado', '24/4/2024 14:30:33'),
(342, 1, 'Conectado', '24/4/2024 14:31:01'),
(343, 1, 'Desconectado', '24/4/2024 14:31:02'),
(344, 1, 'Conectado', '24/4/2024 14:31:10'),
(345, 1, 'Desconectado', '24/4/2024 14:31:13'),
(346, 1, 'Conectado', '24/4/2024 14:31:23'),
(347, 1, 'Desconectado', '24/4/2024 14:31:25'),
(348, 1, 'Conectado', '24/4/2024 14:36:22'),
(349, 1, 'Desconectado', '24/4/2024 14:36:35'),
(350, 1, 'Conectado', '24/4/2024 14:37:03'),
(351, 1, 'Desconectado', '24/4/2024 14:37:05'),
(352, 1, 'Conectado', '24/4/2024 14:40:38'),
(356, 1, 'Conectado', '24/4/2024 14:42:21'),
(358, 1, 'Conectado', '24/4/2024 14:43:40'),
(362, 1, 'Conectado', '24/4/2024 14:44:52'),
(363, 1, 'Desconectado', '24/4/2024 14:44:58'),
(366, 1, 'Conectado', '24/4/2024 14:45:53'),
(367, 1, 'Desconectado', '24/4/2024 14:45:55'),
(368, 1, 'Conectado', '24/4/2024 14:46:04'),
(370, 1, 'Conectado', '24/4/2024 14:51:02'),
(371, 1, 'Conectado', '24/4/2024 14:53:16'),
(372, 1, 'Conectado', '24/4/2024 14:53:54'),
(373, 1, 'Conectado', '24/4/2024 14:56:47'),
(374, 1, 'Conectado', '24/4/2024 15:00:34'),
(377, 1, 'Conectado', '24/4/2024 15:04:14'),
(378, 1, 'Conectado', '24/4/2024 15:07:26'),
(379, 1, 'Conectado', '24/4/2024 15:09:53'),
(380, 1, 'Conectado', '24/4/2024 15:10:33'),
(381, 1, 'Conectado', '24/4/2024 15:11:19'),
(382, 1, 'Conectado', '24/4/2024 15:14:38'),
(383, 1, 'Desconectado', '24/4/2024 15:14:45'),
(384, 1, 'Conectado', '24/4/2024 15:21:45'),
(385, 1, 'Desconectado', '24/4/2024 15:21:59'),
(386, 1, 'Conectado', '24/4/2024 15:22:06'),
(387, 1, 'Conectado', '24/4/2024 15:27:26'),
(388, 1, 'Conectado', '24/4/2024 15:28:14'),
(389, 1, 'Conectado', '24/4/2024 15:29:13'),
(390, 1, 'Conectado', '24/4/2024 15:29:47'),
(392, 1, 'Conectado', '24/4/2024 16:04:35'),
(393, 1, 'Desconectado', '24/4/2024 16:04:38'),
(394, 1, 'Conectado', '24/4/2024 16:04:44'),
(395, 1, 'Conectado', '24/4/2024 16:09:40'),
(396, 1, 'Conectado', '24/4/2024 16:12:24'),
(397, 1, 'Conectado', '24/4/2024 16:14:50'),
(398, 1, 'Conectado', '24/4/2024 16:16:01'),
(399, 1, 'Conectado', '24/4/2024 16:17:06'),
(400, 1, 'Conectado', '24/4/2024 16:20:48'),
(401, 1, 'Conectado', '24/4/2024 16:22:25'),
(402, 1, 'Conectado', '24/4/2024 16:24:42'),
(403, 1, 'Conectado', '24/4/2024 16:30:22'),
(404, 1, 'Conectado', '24/4/2024 16:31:33'),
(405, 1, 'Desconectado', '24/4/2024 16:31:49'),
(406, 1, 'Conectado', '24/4/2024 16:31:57'),
(407, 1, 'Conectado', '24/4/2024 16:36:59'),
(408, 1, 'Conectado', '24/4/2024 16:37:35'),
(409, 1, 'Conectado', '24/4/2024 16:38:52'),
(411, 1, 'Conectado', '24/4/2024 16:39:47'),
(412, 1, 'Conectado', '24/4/2024 16:40:37'),
(413, 1, 'Conectado', '24/4/2024 16:43:23'),
(414, 1, 'Conectado', '24/4/2024 16:45:43'),
(415, 1, 'Conectado', '24/4/2024 16:46:11'),
(416, 1, 'Conectado', '24/4/2024 16:46:42'),
(417, 1, 'Conectado', '24/4/2024 16:48:17'),
(418, 1, 'Conectado', '24/4/2024 16:49:17'),
(419, 1, 'Conectado', '24/4/2024 16:50:48'),
(420, 1, 'Conectado', '24/4/2024 16:51:44'),
(421, 1, 'Conectado', '24/4/2024 17:00:22'),
(422, 1, 'Conectado', '24/4/2024 17:01:50'),
(423, 1, 'Conectado', '24/4/2024 17:02:51'),
(424, 1, 'Conectado', '24/4/2024 17:04:32'),
(425, 1, 'Conectado', '24/4/2024 17:05:07'),
(427, 1, 'Conectado', '24/4/2024 17:06:32'),
(428, 1, 'Conectado', '24/4/2024 17:07:42'),
(429, 1, 'Conectado', '24/4/2024 17:09:25'),
(430, 1, 'Conectado', '24/4/2024 17:15:00'),
(431, 1, 'Conectado', '24/4/2024 17:31:03'),
(433, 1, 'Conectado', '24/4/2024 17:39:04'),
(434, 1, 'Conectado', '24/4/2024 17:39:33'),
(435, 1, 'Conectado', '24/4/2024 17:40:53'),
(436, 1, 'Conectado', '24/4/2024 17:42:58'),
(437, 1, 'Conectado', '24/4/2024 17:50:03'),
(438, 1, 'Conectado', '24/4/2024 17:56:09'),
(439, 1, 'Conectado', '24/4/2024 17:57:13'),
(455, 1, 'Conectado', '24/4/2024 17:59:11'),
(456, 1, 'Conectado', '24/4/2024 18:01:10'),
(462, 1, 'Conectado', '24/4/2024 18:01:49'),
(463, 1, 'Conectado', '24/4/2024 18:04:24'),
(464, 1, 'Conectado', '24/4/2024 18:05:53'),
(465, 1, 'Conectado', '24/4/2024 18:07:59'),
(466, 1, 'Conectado', '24/4/2024 18:17:12'),
(467, 1, 'Conectado', '24/4/2024 18:18:59'),
(468, 1, 'Conectado', '24/4/2024 18:28:50'),
(469, 1, 'Conectado', '24/4/2024 18:30:10'),
(470, 1, 'Conectado', '24/4/2024 18:37:55'),
(471, 1, 'Conectado', '24/4/2024 18:38:46'),
(472, 1, 'Conectado', '24/4/2024 18:41:27'),
(473, 1, 'Conectado', '24/4/2024 18:44:27'),
(474, 1, 'Conectado', '24/4/2024 18:48:56'),
(475, 1, 'Conectado', '24/4/2024 18:50:22'),
(476, 1, 'Conectado', '24/4/2024 18:53:44'),
(477, 1, 'Conectado', '24/4/2024 18:55:29'),
(478, 1, 'Conectado', '25/4/2024 12:30:40'),
(479, 1, 'Desconectado', '25/4/2024 12:30:43'),
(480, 1, 'Conectado', '25/4/2024 12:30:50'),
(481, 1, 'Conectado', '25/4/2024 12:46:38'),
(482, 1, 'Conectado', '25/4/2024 12:47:00'),
(483, 1, 'Desconectado', '25/4/2024 12:47:53'),
(484, 1, 'Conectado', '25/4/2024 12:48:17'),
(485, 1, 'Desconectado', '25/4/2024 13:23:09'),
(486, 1, 'Conectado', '25/4/2024 13:23:29'),
(487, 1, 'Desconectado', '25/4/2024 13:26:18'),
(488, 1, 'Desconectado', '25/4/2024 13:27:00'),
(489, 1, 'Conectado', '25/4/2024 13:27:21'),
(490, 1, 'Desconectado', '25/4/2024 13:27:32'),
(491, 2, 'Conectado', '25/4/2024 13:27:39'),
(492, 1, 'Conectado', '25/4/2024 13:28:56'),
(493, 1, 'Conectado', '25/4/2024 13:29:31'),
(494, 1, 'Conectado', '25/4/2024 13:36:12'),
(495, 1, 'Conectado', '25/4/2024 13:39:23'),
(496, 1, 'Desconectado', '25/4/2024 13:39:49'),
(497, 2, 'Conectado', '25/4/2024 13:39:58'),
(498, 2, 'Desconectado', '25/4/2024 13:40:05'),
(499, 1, 'Conectado', '25/4/2024 13:40:12'),
(500, 1, 'Conectado', '25/4/2024 13:57:41'),
(501, 1, 'Conectado', '25/4/2024 14:02:54'),
(502, 1, 'Conectado', '25/4/2024 14:03:42'),
(503, 1, 'Conectado', '25/4/2024 14:05:49'),
(504, 1, 'Desconectado', '25/4/2024 14:09:03'),
(505, 1, 'Conectado', '25/4/2024 14:09:21'),
(506, 1, 'Desconectado', '25/4/2024 14:09:30'),
(507, 2, 'Conectado', '25/4/2024 14:09:54'),
(508, 2, 'Desconectado', '25/4/2024 14:13:33'),
(509, 1, 'Conectado', '25/4/2024 14:13:39'),
(510, 1, 'Conectado', '25/4/2024 14:33:36'),
(511, 1, 'Conectado', '25/4/2024 14:46:13'),
(512, 1, 'Desconectado', '25/4/2024 14:52:49'),
(513, 1, 'Conectado', '25/4/2024 14:53:01'),
(514, 1, 'Desconectado', '25/4/2024 14:55:25'),
(515, 1, 'Conectado', '25/4/2024 14:55:32'),
(516, 1, 'Desconectado', '25/4/2024 14:55:42'),
(517, 1, 'Conectado', '25/4/2024 14:55:48'),
(518, 1, 'Desconectado', '25/4/2024 14:59:17'),
(519, 1, 'Conectado', '25/4/2024 14:59:24'),
(520, 1, 'Conectado', '25/4/2024 15:49:05'),
(521, 1, 'Desconectado', '25/4/2024 15:52:46'),
(522, 1, 'Conectado', '25/4/2024 15:53:46'),
(523, 1, 'Desconectado', '25/4/2024 16:07:42'),
(524, 1, 'Conectado', '25/4/2024 16:07:48'),
(525, 1, 'Desconectado', '25/4/2024 16:07:55'),
(526, 1, 'Conectado', '25/4/2024 16:37:35'),
(527, 1, 'Desconectado', '25/4/2024 16:40:23'),
(528, 1, 'Conectado', '25/4/2024 16:40:35'),
(529, 1, 'Desconectado', '25/4/2024 16:41:16'),
(530, 1, 'Conectado', '25/4/2024 16:41:31'),
(531, 1, 'Desconectado', '25/4/2024 16:42:06'),
(532, 1, 'Conectado', '25/4/2024 16:42:12'),
(533, 1, 'Desconectado', '25/4/2024 16:42:37'),
(534, 1, 'Conectado', '25/4/2024 16:42:44'),
(535, 1, 'Desconectado', '25/4/2024 16:42:51'),
(540, 1, 'Conectado', '25/4/2024 16:46:20'),
(541, 1, 'Desconectado', '25/4/2024 16:46:52'),
(542, 1, 'Conectado', '25/4/2024 16:47:03'),
(543, 1, 'Desconectado', '25/4/2024 16:47:36'),
(544, 1, 'Conectado', '25/4/2024 16:47:46'),
(545, 1, 'Conectado', '25/4/2024 16:48:21'),
(546, 1, 'Conectado', '25/4/2024 16:48:33'),
(547, 1, 'Desconectado', '25/4/2024 16:49:16'),
(548, 1, 'Conectado', '25/4/2024 16:49:24'),
(549, 1, 'Desconectado', '25/4/2024 16:49:49'),
(550, 1, 'Conectado', '25/4/2024 16:49:55'),
(551, 1, 'Desconectado', '25/4/2024 16:50:25'),
(552, 1, 'Conectado', '25/4/2024 16:50:31'),
(553, 1, 'Desconectado', '25/4/2024 16:50:51'),
(554, 1, 'Conectado', '25/4/2024 16:50:57'),
(555, 1, 'Desconectado', '25/4/2024 16:53:49'),
(556, 1, 'Conectado', '25/4/2024 16:53:57'),
(557, 1, 'Desconectado', '25/4/2024 16:54:02'),
(558, 1, 'Conectado', '25/4/2024 16:55:06'),
(559, 1, 'Conectado', '25/4/2024 16:57:56'),
(560, 1, 'Conectado', '25/4/2024 16:59:55'),
(561, 1, 'Desconectado', '25/4/2024 17:00:15'),
(562, 1, 'Conectado', '25/4/2024 17:00:23'),
(563, 1, 'Desconectado', '25/4/2024 17:00:32'),
(566, 1, 'Conectado', '25/4/2024 17:01:02'),
(567, 1, 'Desconectado', '25/4/2024 17:21:13'),
(568, 1, 'Conectado', '25/4/2024 17:44:12'),
(569, 1, 'Conectado', '26/4/2024 9:51:35'),
(570, 1, 'Conectado', '26/4/2024 10:06:13'),
(571, 1, 'Conectado', '26/4/2024 11:16:38'),
(572, 1, 'Conectado', '26/4/2024 11:52:37'),
(573, 1, 'Conectado', '26/4/2024 12:48:12'),
(574, 1, 'Conectado', '26/4/2024 13:33:49'),
(575, 1, 'Desconectado', '26/4/2024 13:41:05'),
(576, 1, 'Conectado', '26/4/2024 13:41:18'),
(577, 1, 'Conectado', '26/4/2024 14:17:55'),
(578, 1, 'Conectado', '29/4/2024 9:16:20'),
(579, 1, 'Desconectado', '29/4/2024 9:20:44'),
(580, 1, 'Conectado', '29/4/2024 9:20:51'),
(581, 1, 'Desconectado', '29/4/2024 9:39:36'),
(582, 1, 'Conectado', '29/4/2024 9:39:44'),
(583, 1, 'Desconectado', '29/4/2024 9:39:46'),
(584, 1, 'Conectado', '29/4/2024 9:40:38'),
(585, 1, 'Desconectado', '29/4/2024 9:40:59'),
(586, 2, 'Conectado', '29/4/2024 9:41:09'),
(587, 2, 'Desconectado', '29/4/2024 9:48:01'),
(588, 1, 'Conectado', '29/4/2024 9:48:15'),
(589, 1, 'Desconectado', '29/4/2024 9:48:52'),
(592, 1, 'Conectado', '29/4/2024 9:49:16'),
(593, 1, 'Desconectado', '29/4/2024 10:04:37'),
(594, 1, 'Conectado', '29/4/2024 10:07:45'),
(595, 1, 'Desconectado', '29/4/2024 10:09:10'),
(597, 1, 'Conectado', '29/4/2024 10:15:36'),
(598, 1, 'Desconectado', '29/4/2024 10:27:11'),
(599, 1, 'Conectado', '29/4/2024 10:27:29'),
(600, 1, 'Desconectado', '29/4/2024 10:27:44'),
(601, 2, 'Conectado', '29/4/2024 10:27:51'),
(602, 2, 'Desconectado', '29/4/2024 10:53:09'),
(603, 1, 'Conectado', '29/4/2024 10:53:21'),
(604, 1, 'Desconectado', '29/4/2024 10:53:49'),
(607, 2, 'Conectado', '29/4/2024 10:56:34'),
(608, 2, 'Desconectado', '29/4/2024 10:56:43'),
(609, 1, 'Conectado', '29/4/2024 10:57:02'),
(610, 1, 'Desconectado', '29/4/2024 10:57:07'),
(611, 1, 'Conectado', '29/4/2024 10:57:15'),
(612, 1, 'Desconectado', '29/4/2024 11:01:41'),
(613, 56, 'Conectado', '29/4/2024 11:01:56'),
(614, 56, 'Desconectado', '29/4/2024 11:02:19'),
(615, 56, 'Conectado', '29/4/2024 11:02:58'),
(616, 56, 'Desconectado', '29/4/2024 11:03:19'),
(617, 1, 'Conectado', '29/4/2024 11:04:10'),
(618, 1, 'Desconectado', '29/4/2024 11:04:26'),
(619, 57, 'Conectado', '29/4/2024 11:04:36'),
(620, 57, 'Desconectado', '29/4/2024 11:04:42'),
(621, 1, 'Conectado', '29/4/2024 11:04:49'),
(622, 1, 'Desconectado', '29/4/2024 11:05:02'),
(623, 1, 'Conectado', '29/4/2024 11:05:19'),
(624, 1, 'Conectado', '29/4/2024 11:53:19'),
(625, 1, 'Desconectado', '29/4/2024 12:01:53'),
(626, 1, 'Conectado', '29/4/2024 12:02:00'),
(627, 1, 'Desconectado', '29/4/2024 12:28:10'),
(628, 2, 'Conectado', '29/4/2024 12:28:21'),
(629, 2, 'Desconectado', '29/4/2024 12:33:59'),
(630, 1, 'Conectado', '29/4/2024 12:34:06'),
(631, 1, 'Conectado', '29/4/2024 13:06:00'),
(632, 1, 'Desconectado', '29/4/2024 13:14:41'),
(633, 1, 'Conectado', '29/4/2024 13:15:31'),
(634, 1, 'Desconectado', '29/4/2024 13:15:48'),
(637, 1, 'Conectado', '29/4/2024 13:16:15'),
(638, 1, 'Desconectado', '29/4/2024 13:16:30'),
(639, 1, 'Conectado', '29/4/2024 13:17:06'),
(640, 1, 'Desconectado', '29/4/2024 13:17:23'),
(643, 1, 'Conectado', '29/4/2024 13:20:28'),
(644, 1, 'Desconectado', '29/4/2024 13:45:37'),
(645, 1, 'Conectado', '29/4/2024 13:45:44'),
(646, 1, 'Conectado', '29/4/2024 14:16:09'),
(647, 1, 'Conectado', '29/4/2024 16:52:33'),
(648, 1, 'Conectado', '29/4/2024 17:23:08'),
(649, 1, 'Conectado', '29/4/2024 17:31:55'),
(650, 1, 'Desconectado', '29/4/2024 17:31:59'),
(651, 1, 'Conectado', '29/4/2024 17:32:53'),
(652, 1, 'Desconectado', '29/4/2024 17:34:24'),
(653, 59, 'Conectado', '29/4/2024 17:34:35'),
(654, 59, 'Desconectado', '29/4/2024 17:44:26'),
(655, 1, 'Conectado', '29/4/2024 17:48:29'),
(656, 1, 'Conectado', '29/4/2024 18:19:48');

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
  `token` varchar(255) DEFAULT NULL,
  `verificado` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `passwd`, `nombreCompleto`, `idRol`, `token`, `verificado`) VALUES
(1, 'pablo@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'pablo', 1, '96f86f8e-ea71-4312-82e1-08d8e237b698', 1),
(2, 'ivan@user.com', '2c42e5cf1cdbafea04ed267018ef1511', 'Ivan User', 2, '38e6a233-10fc-4851-9888-f5384cd6f151', 1),
(3, 'juan@gmail.com', 'a94652aa97c7211ba8954dd15a3cf838', 'juang', 2, '833917c0-cc27-45f9-954d-30a1d615e82d', 0),
(4, 'pablo@user.com', 'ee11cbb19052e40b07aac0ca060c23ee', 'user', 2, '4bb0c60f-0121-474c-97bd-ed7e07a8d4f0', 0),
(5, 'pabloggg@admin.com', '21232f297a57a5a743894a0e4a801fc3', 'Pablo Admin', 1, 'd4df6eff-c660-4b8d-a6df-d83baa5ad0f6', 0),
(56, 'pepin@gmail.com', 'acb19291d1f2608fa97a927dff746e76', 'pepin', 1, '516607da-c81c-408e-9ee7-8dcb5ea68d23', 1),
(57, 'ale@gmail.com', 'e052450f29b2e0e9a53fd4eb389e25a9', 'alejandro', 2, '85cb3773-785f-4cd4-9bde-59f52689946a', 1),
(59, 'maria@gmail.com', '668ef5008eb032e227b200236a62d1a7', 'maria', 2, '0acf886e-bd4f-49c0-b2aa-90bc08d23065', 1);

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
(52, 'h'),
(2, 'La Colina'),
(53, 'lf'),
(3, 'Los Álamos'),
(5, 'Montemar Alto'),
(51, 'rd');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `establecimientos`
--
ALTER TABLE `establecimientos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=657;

--
-- AUTO_INCREMENT de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
