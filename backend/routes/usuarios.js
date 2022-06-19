const { trackSlotScopes } = require('@vue/compiler-core');
const express = require('express');
const router = express.Router();
const userService = require('../api/services/user');
const ValidadorLogin = require("../validators/ValidadorLogin");
const ValidadorRegistro = require("../validators/ValidadorRegistro");
const ValidadorLista = require("../validators/ValidadorLista");
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");




router.get('/', (req, res) => {
    userService.users(req,res);
});

router.post('/login', [ValidadorLogin.LoginSchema], (req, res) => {
    userService.login(req, res);
});



router.post('/registro', [ValidadorRegistro.registroSchema], (req, res) => {
    userService.registro(req, res);

})

router.get('/listas', verifyLoggedInUser.authenticateToken, (req, res) => {

    userService.getMisListas(req, res);
})

router.get('/lista/:idLista', verifyLoggedInUser.authenticateToken, (req, res) =>{

    userService.getLista(req, res);
})

router.post('/lista/crear', [ValidadorLista.ListaSchema], verifyLoggedInUser.authenticateToken, (req, res) =>{

    userService.createLista(req, res);
})

router.delete('/lista/:idLista', verifyLoggedInUser.authenticateToken, (req,res) => {

    userService.deleteLista(req, res);
})


router.put('/lista/:idLista/borrar/:idPrograma', verifyLoggedInUser.authenticateToken, (req, res) => {
    userService.deleteProgramaLista(req,res);
})

router.put('/lista/:idLista/agregar/:idPrograma', verifyLoggedInUser.authenticateToken, (req, res) => {
    userService.addProgramaLista(req,res);
})


module.exports = router; 