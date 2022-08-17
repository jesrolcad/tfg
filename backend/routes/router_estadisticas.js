const express = require('express');
const router_estadisticas = express.Router();
const estadisticasService = require('../api/services/estadisticas');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");
const verifyRoles = require("../api/middlewares/verifyRoles");

router_estadisticas.get('/pie-actores',  verifyLoggedInUser.authenticateToken, verifyRoles("Admin"), (req, res) => {
    estadisticasService.getPieActores(req,res);
})

router_estadisticas.get('/programas',  verifyLoggedInUser.authenticateToken, verifyRoles("Admin"), (req, res) => {
    estadisticasService.getProgramas(req,res);
})

router_estadisticas.get('/usuarios-mes',  verifyLoggedInUser.authenticateToken, verifyRoles("Admin"), (req, res) => {
    estadisticasService.getUsuariosMes(req,res);
})

router_estadisticas.get('/generos',  verifyLoggedInUser.authenticateToken, verifyRoles("Admin"), (req, res) => {
    estadisticasService.getProgramasPorGenero(req,res);
})

router_estadisticas.get('/puntuaciones',  verifyLoggedInUser.authenticateToken, verifyRoles("Admin"), (req, res) => {
    estadisticasService.getProgramasPuntuados(req,res);
})

router_estadisticas.get('/insignias',  verifyLoggedInUser.authenticateToken, verifyRoles("Admin"), (req, res) => {
    estadisticasService.getUsuariosInsignia(req,res);
})

router_estadisticas.get('/listas', (req, res) => {
    estadisticasService.getListasUsuarios(req,res);
})

router_estadisticas.get('/listas-programas', (req, res) => {
    estadisticasService.getProgramasLP(req,res);
})


router_estadisticas.get('/edad', (req, res) => {
    estadisticasService.getTipoProgramaEdad(req,res);
})


module.exports = router_estadisticas;