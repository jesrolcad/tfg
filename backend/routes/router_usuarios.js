const { trackSlotScopes } = require('@vue/compiler-core');
const express = require('express');
const router = express.Router();
const userService = require('../api/services/user');
const ValidadorLogin = require("../api/validators/ValidadorLogin");
const ValidadorRegistro = require("../api/validators/ValidadorRegistro");
const verifyLoggedInUser = require("../api/middlewares/verifyLoggedInUser");

router.post('/login', [ValidadorLogin.LoginSchema], (req, res) => {
    userService.login(req, res);
});


router.post('/registro', [ValidadorRegistro.registroSchema], (req, res) => {
    userService.registro(req, res);

});

router.get('/perfil', verifyLoggedInUser.authenticateToken, (req, res) => {
    userService.perfil(req,res);
})

module.exports = router; 