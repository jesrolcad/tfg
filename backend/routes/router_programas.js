const express = require('express');
const router_programas= express.Router();
const programaService = require('../api/services/programas');

router_programas.get('/all', (req,res) => {
    programaService.getAllProgramas(req, res);
});

module.exports = router_programas;