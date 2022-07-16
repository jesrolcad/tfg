const express = require('express');
const router_recomendaciones= express.Router();
const recomendacionesService = require('../api/services/recomendaciones');

router_recomendaciones.post('/sugerencias', (req,res) => {
    recomendacionesService.getSugerencias(req,res);
});


module.exports = router_recomendaciones;