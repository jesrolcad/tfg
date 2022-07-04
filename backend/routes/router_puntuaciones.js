const express = require('express');
const router = express.Router();
const puntuacionService = require('../api/services/puntuaciones');
const ValidadorPuntuacion = require("../validators/ValidadorPuntuacion");
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router.post('/:idPrograma', verifyLoggedInUser.authenticateToken, [ValidadorPuntuacion.PuntuacionSchema], (req, res) => {

    puntuacionService.createOrUpdatePuntuacion(req,res);
})

router.get('/:idPrograma', verifyLoggedInUser.authenticateToken, (req, res) => {
    
    puntuacionService.getPuntuacionMediaPrograma(req,res);

})

module.exports = router;