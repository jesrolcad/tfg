const { trackSlotScopes } = require('@vue/compiler-core');
const express = require('express');
const router = express.Router();
const userService = require('../api/services/user');
const ValidadorLogin = require("../validators/ValidadorLogin");
const ValidadorRegistro = require("../validators/ValidadorRegistro");




router.get('/', (req, res) => {
    userService.users(req,res);
});

router.post('/login', [ValidadorLogin.LoginSchema], (req, res) => {
    userService.login(req, res);
});



router.post('/registro', [ValidadorRegistro.registroSchema], (req, res) => {
    userService.registro(req, res);

})


module.exports = router; 