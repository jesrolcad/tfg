const express = require('express');
const router= express.Router();
const programaService = require('./services/programas');

router.get('/programas/all', (req,res) => {
    programaService.getAllProgramas(req, res);
});

module.exports = router;