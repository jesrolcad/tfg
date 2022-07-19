const express = require('express');
const router_recomendaciones= express.Router();
const recomendacionesService = require('../api/services/recomendaciones');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router_recomendaciones.post('/sugerencias', verifyLoggedInUser.authenticateToken, (req,res) => {
    recomendacionesService.getSugerencias(req,res);
});


module.exports = router_recomendaciones;