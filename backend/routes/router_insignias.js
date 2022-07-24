const express = require('express');
const router_insignias = express.Router();
const insigniaService = require('../api/services/insignias');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router_insignias.put('/programas', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getProgramasVistos(req,res);
})

router_insignias.put('/listas', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getListasPropias(req,res);
})

router_insignias.put('/listas-programas', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getProgramasListasPropias(req,res);
})

router_insignias.put('/generos', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getGenerosProgramasVistos(req,res);
})

router_insignias.put('/actores', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getActoresProgramasVistos(req,res);
})

router_insignias.get('/usuario', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getInsigniasUsuario(req,res);
})

module.exports = router_insignias;