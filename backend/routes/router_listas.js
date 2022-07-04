const express = require('express');
const router = express.Router();
const listaService = require('../api/services/listas');
const ValidadorLista = require("../validators/ValidadorLista");
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router.get('/listas', verifyLoggedInUser.authenticateToken, (req, res) => {

    listaService.getMisListas(req, res);
})

router.get('/lista/:idLista', verifyLoggedInUser.authenticateToken, (req, res) =>{

    listaService.getLista(req, res);
})

router.post('/lista/crear', [ValidadorLista.ListaSchema], verifyLoggedInUser.authenticateToken, (req, res) =>{

    listaService.createLista(req, res);
})

router.delete('/lista/:idLista', verifyLoggedInUser.authenticateToken, (req,res) => {

    listaService.deleteLista(req, res);
})


router.put('/lista/:idLista/borrar/:idPrograma', verifyLoggedInUser.authenticateToken, (req, res) => {
    listaService.deleteProgramaLista(req,res);
})

router.put('/lista/:idLista/agregar/:idPrograma', verifyLoggedInUser.authenticateToken, (req, res) => {
    listaService.addProgramaLista(req,res);
})

module.exports = router;