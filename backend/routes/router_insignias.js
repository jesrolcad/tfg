const express = require('express');
const router_insignias = express.Router();
const insigniaService = require('../api/services/insignias');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router_insignias.get('/programas', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getProgramasVistos(req,res);
})

router_insignias.get('/listas', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getListasPropias(req,res);
})

router_insignias.get('/listas-programas', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getProgramasListasPropias(req,res);
})

router_insignias.get('/generos', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getGenerosProgramasVistos(req,res);
})

router_insignias.get('/actores', verifyLoggedInUser.authenticateToken, (req, res) => {
    insigniaService.getActoresProgramasVistos(req,res);
})


module.exports = router_insignias;