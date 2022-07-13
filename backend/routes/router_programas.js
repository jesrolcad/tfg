const express = require('express');
const router_programas= express.Router();
const programaService = require('../api/services/programas');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router_programas.get('/all', verifyLoggedInUser.authenticateToken, (req,res) => {
    programaService.getAllProgramas(req, res);
});

router_programas.get('/:id', verifyLoggedInUser.authenticateToken, (req,res) =>{
    programaService.getProgramaById(req,res);
});

/*router_programas.get('/:url', (req,res) =>{
    programaService.getProgramaByURL(req,res);
});*/

module.exports = router_programas;