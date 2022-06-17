const { trackSlotScopes } = require('@vue/compiler-core');
const express = require('express');
const router = express.Router();
const userService = require('../api/services/user');
const { route } = require('./router_programas');



router.get('/', (req, res) => {
    userService.users(req,res);
});

router.post('/login', (req, res) => {
    userService.login(req, res);
});

router.post('/registro', (req, res) => {
    userService.registro(req, res);

})

router.get('/:idUsuario/listas', (req, res) => {

    userService.getMisListas(req, res);
})

router.get('/:idUsuario/lista/:idLista', (req, res) =>{

    userService.getLista(req, res);
})

router.post('/:idUsuario/lista/crear', (req, res) =>{

    userService.createLista(req, res);
})

router.delete('/:idUsuario/lista/:idLista', (req,res) => {

    userService.deleteLista(req, res);
})


module.exports = router; 