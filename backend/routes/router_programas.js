const express = require('express');
const router_programas= express.Router();
const programaService = require('../api/services/programas');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router_programas.get('/all', verifyLoggedInUser.authenticateToken, (req,res) => {
    programaService.getAllProgramas(req, res);
});


router_programas.get('/generos', async(req,res) => {
    programaService.getGeneros(req,res);
});

router_programas.post('/busquedagenero', verifyLoggedInUser.authenticateToken, async(req,res) => {
    programaService.buscarPorGenero(req,res);
});

router_programas.post('/busquedaplataforma', verifyLoggedInUser.authenticateToken, async(req,res) => {
    programaService.buscarPorPlataforma(req,res);
});

router_programas.post('/busquedatipo', verifyLoggedInUser.authenticateToken, async(req,res) => {
    programaService.buscarPorTipo(req,res);
});

router_programas.post('/filtrados', async(req,res) => {
    programaService.getProgramasFiltados(req,res);
});

router_programas.post('/nombre', verifyLoggedInUser.authenticateToken, async(req,res) => {
    programaService.getProgramaByName(req,res);
});

router_programas.get('/:id', verifyLoggedInUser.authenticateToken, (req,res) =>{
    programaService.getProgramaById(req,res);
});


/*router_programas.get('/:url', (req,res) =>{
    programaService.getProgramaByURL(req,res);
});*/

module.exports = router_programas;