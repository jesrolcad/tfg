const express = require('express');
const router_actores= express.Router();
const actorService = require('../api/services/actores');
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router_actores.post('/programa', verifyLoggedInUser.authenticateToken, (req,res) => {
    actorService.getActoresPrograma(req, res);
});

router_actores.get('/:nombre', verifyLoggedInUser.authenticateToken, (req,res) => {
    actorService.getActorByName(req, res);
});

module.exports = router_actores;