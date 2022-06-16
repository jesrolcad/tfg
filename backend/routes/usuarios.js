const { trackSlotScopes } = require('@vue/compiler-core');
const express = require('express');
const router = express.Router();
const userService = require('../api/services/user');



router.get('/', (req, res) => {
    userService.users(req,res);
});

router.post('/login', (req, res) => {
    userService.login(req, res);
});



router.post('/registro', (req, res) => {
    userService.registro(req, res);

})



router.post('/user', (req, res) => {

    userService.prueba(req,res);
});


module.exports = router; 