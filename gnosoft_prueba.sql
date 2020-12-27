-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-12-2020 a las 23:28:03
-- Versión del servidor: 10.1.39-MariaDB
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gnosoft_prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesfactura`
--

CREATE TABLE `detallesfactura` (
  `detallesfactura_pk` int(11) NOT NULL,
  `defa_fact_fk` int(11) NOT NULL,
  `defa_detalle` varchar(30) NOT NULL,
  `defa_cantidad` int(11) NOT NULL,
  `defa_valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detallesfactura`
--

INSERT INTO `detallesfactura` (`detallesfactura_pk`, `defa_fact_fk`, `defa_detalle`, `defa_cantidad`, `defa_valor`) VALUES
(16, 11, 'producto1', 1, 130000),
(17, 11, 'producto1', 1, 130000),
(18, 11, 'producto1', 1, 130000),
(19, 11, 'producto4', 1, 400000),
(20, 11, 'producto1', 1, 130000),
(21, 11, 'producto4', 1, 400000),
(41, 22, 'producto5', 2, 30000),
(42, 22, 'producto1', 1, 130000),
(43, 22, 'producto5', 2, 30000),
(44, 22, 'producto1', 1, 130000),
(45, 22, 'producto5', 2, 30000),
(46, 22, 'producto1', 1, 130000),
(51, 31, 'producto1', 2, 130000),
(52, 32, 'producto1', 1, 130000),
(53, 32, 'producto5', 2, 30000),
(54, 33, 'producto1', 2, 130000),
(55, 33, 'producto1', 1, 130000),
(56, 34, 'producto4', 1, 400000),
(57, 35, 'producto4', 2, 400000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `facturas_pk` int(11) NOT NULL,
  `fact_nombre` varchar(25) NOT NULL,
  `fact_fecha` date NOT NULL,
  `fact_subtotal` int(11) NOT NULL,
  `fact_iva` int(11) NOT NULL,
  `fact_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`facturas_pk`, `fact_nombre`, `fact_fecha`, `fact_subtotal`, `fact_iva`, `fact_total`) VALUES
(28, 'YOPEE', '2020-11-06', 190000, 0, 190000),
(31, 'PROOF1', '2020-11-06', 260000, 0, 260000),
(32, 'PROOF2', '2020-11-06', 190000, 0, 190000),
(33, 'PROOF3', '2020-11-06', 390000, 0, 390000),
(34, 'hjgjg', '2020-12-27', 400000, 0, 400000),
(35, 'diego', '2020-12-27', 800000, 0, 800000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `productos_pk` int(11) NOT NULL,
  `prod_nombre` varchar(45) NOT NULL,
  `prod_cantidad` int(11) NOT NULL,
  `prod_precio` int(11) NOT NULL,
  `prod_fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`productos_pk`, `prod_nombre`, `prod_cantidad`, `prod_precio`, `prod_fecha`) VALUES
(33, 'producto4', 2, 400000, '2020-11-03'),
(34, 'producto5', 4, 30000, '2020-11-04');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detallesfactura`
--
ALTER TABLE `detallesfactura`
  ADD PRIMARY KEY (`defa_fact_fk`,`detallesfactura_pk`) USING BTREE,
  ADD UNIQUE KEY `Id_detalles` (`detallesfactura_pk`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`facturas_pk`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`productos_pk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detallesfactura`
--
ALTER TABLE `detallesfactura`
  MODIFY `detallesfactura_pk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `facturas_pk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `productos_pk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
