const express = require('express');
const router_actores= express.Router();
const actorService = require('../api/services/actores');

router_actores.post('/programa', (req,res) => {
    actorService.getActoresPrograma(req, res);
});

module.exports = router_actores;